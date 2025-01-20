interface Script {
  content: string;
  name: string;
}

interface Volta {
  extends?: string;
  node?: string;
  yarn?: string;
}

interface Engines {
  node?: string;
  npm?: string;
  pnpm?: string;
  yarn?: string;
}

export interface PackageJson {
  engines?: Engines;
  name: string;
  packageManager?: string;
  scripts: Record<string, string>;
  version: string;
  volta?: Volta;
}

type MappedPackageJson = Omit<PackageJson, 'name' | 'scripts'> & {
  folderContainer: string;
  packageName: string;
  scripts: Array<Script>;
};

export type NormalizedScripts = Record<string, MappedPackageJson>;
