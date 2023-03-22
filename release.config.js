const branch = process.env.DRONE_BRANCH;
const config = {
  branches: ['master', { name: 'release/*', channel: 'release', prerelease: 'beta' }],
  plugins: [
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'test', release: 'patch' },
          { type: 'storybook', release: 'patch' },
          { type: 'locale', release: 'patch' },
          { type: 'component', release: 'minor' },
          { type: 'api', release: 'minor' },
        ],
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [ci skip]\n\n${nextRelease.notes}',
      },
    ],
  ],
  repositoryUrl: 'git@bitbucket.org:maxwin-inc/react-app-template.git',
  tagFormat: '${version}',
};

if (branch === 'master') config.plugins = ['@semantic-release/changelog', ...config.plugins];

module.exports = config;
