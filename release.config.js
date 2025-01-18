// eslint-disable-next-line no-restricted-exports
export default {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'next',
    'next-major',
    {
      name: 'beta',
      prerelease: true,
    },
    {
      name: 'alpha',
      prerelease: true,
    },
    {
      name: 'pre',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
        },
        preset: 'conventionalcommits',
        presetConfig: {
          changelogHeader:
            '# Hi\n\n bais hi lorem ipsum ![Insomnia API Client](https://raw.githubusercontent.com/Kong/insomnia/develop/screenshots/main.png)',
          compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
          issuePrefixes: ['#'],
          issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/bug/{{id}}',
        },
      },
    ],
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'release: ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
