export interface Script {
  scriptContent: string;
  scriptName: string;
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

type MappedPackageJson = Omit<PackageJson, 'scripts'> & {
  folderContainer: string;
  scripts?: Array<Script>;
};

export type NormalizedScripts = Record<string, MappedPackageJson>;

export type PackageJson = Partial<{
  author?: string | { email?: string; name: string; url?: string };
  bin?: Record<string, string>;
  bugs?: {
    email?: string;
    url: string;
  };
  bundledDependencies?: Array<string>;
  config?: Record<string, unknown>;
  contributors?: Array<string | { email?: string; name: string; url?: string }>;
  cpu?: string | Array<string>;
  dependencies?: Record<string, string>;
  description?: string;
  devDependencies?: Record<string, string>;
  directories?: {
    bin?: string;
    doc?: string;
    lib?: string;
    man?: string;
  };
  engines?: Engines;
  exports?: Record<string, string | { require: string }>;
  files?: Array<string>;
  homepage?: string;
  keywords?: Array<string>;
  license?: string;
  main?: string;
  man?: string | Array<string>;
  name: string;
  optionalDependencies?: Record<string, string>;
  os?: string | Array<string>;
  packageManager?: string;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional: boolean }>;
  postinstall?: string;
  preinstall?: string;
  private?: boolean;
  publishConfig?: {
    access?: 'public' | 'restricted';
    registry?: string;
  };
  repository?: {
    type: string;
    url: string;
  };
  scripts?: Record<string, string>;
  sideEffects?: boolean | Array<string>;
  testing?: string;
  types?: string;
  typesVersions?: Record<string, unknown>;
  version: string;
  volta?: Volta;
}>;
