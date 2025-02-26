import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

import { tryCatch } from '@rodbe/fn-utils';

import { FOLDERS_TO_IGNORE } from './constants';
import type { NormalizedScripts, PackageJson, Script } from './script.types';

interface GetPackageJsonPathsProps {
  absolutePath: string;
  fileListAccumulator?: Array<string>;
}

const getPackageJsonPaths = ({ absolutePath, fileListAccumulator }: GetPackageJsonPathsProps) => {
  let fileList = fileListAccumulator ?? [];
  const filesAndFolderNames = readdirSync(absolutePath);
  const filteredLs = filesAndFolderNames.filter(
    (fileOrFolderName) => !FOLDERS_TO_IGNORE.includes(fileOrFolderName)
  );

  filteredLs.forEach((fileOrFolderName) => {
    const filePath = join(absolutePath, fileOrFolderName);

    if (statSync(filePath, { throwIfNoEntry: false })?.isDirectory()) {
      fileList = getPackageJsonPaths({ absolutePath: filePath, fileListAccumulator: fileList });
    } else if (fileOrFolderName === 'package.json') {
      fileList.push(filePath);
    }
  });

  return fileList;
};

const scriptsMapper = (scripts: PackageJson['scripts']): Array<Script> | undefined => {
  if (!scripts) {
    return;
  }

  return Object.entries(scripts).map<Script>(([scriptName, scriptContent]) => ({
    scriptContent,
    scriptName,
  }));
};

interface PackageJsonsMapperProps {
  cwd: string;
  packageJsonPaths: Array<string>;
}

const packageJsonsMapper = ({
  cwd,
  packageJsonPaths,
}: PackageJsonsMapperProps): NormalizedScripts => {
  return packageJsonPaths.reduce<NormalizedScripts>((acc, pkgJsonPath) => {
    const [err, pkgJson] = tryCatch<PackageJson>(
      () => JSON.parse(readFileSync(pkgJsonPath, 'utf-8')) as PackageJson
    );

    if (err) {
      return acc;
    }

    const { scripts, ...extraProps } = pkgJson;
    const folderContainer =
      pkgJsonPath
        .replace(cwd, '')
        .replace('package.json', '')
        .replace(/^[\\/]/g, '') || 'Root';

    if (!acc[folderContainer]) {
      acc[folderContainer] = {
        folderContainer,
        scripts: scriptsMapper(scripts),
        ...extraProps,
      };
    }

    return acc;
  }, {});
};

interface GetAllPackageJsonsProps {
  cwd: string;
}

export const getAllPackageJsons = ({ cwd }: GetAllPackageJsonsProps) => {
  const packageJsonPaths = getPackageJsonPaths({ absolutePath: cwd });

  if (packageJsonPaths.length === 0) {
    return null;
  }

  return packageJsonsMapper({ cwd, packageJsonPaths });
};

export type * from './script.types';
