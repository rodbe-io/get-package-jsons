import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  defaultIgnores: true,
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};

// eslint-disable-next-line no-restricted-exports
export default Configuration;
