module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/mocks/**'],
  coveragePathIgnorePatterns: [],
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    'tsx',
    'ts',
    'web.js',
    'js',
    'web.ts',
    'web.tsx',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '/^sentry\\/(.*)$/': '<rootDir>/src/sentry/$1',
    '/^exceptions\\/(.*)$/': '<rootDir>/src/exceptions/$1',
    '/^services\\/(.*)$/': '<rootDir>/src/services/$1',
    '/^gql\\/(.*)$/': '<rootDir>/src/gql/$1',
    '/^modules\\/(.*)$/': '<rootDir>/src/modules/$1',
    '/^components\\/(.*)$/': '<rootDir>/src/components/$1',
    '/^containers\\/(.*)$/': '<rootDir>/src/containers/$1',
  },
  modulePaths: ['<rootDir>/src'],
  preset: 'ts-jest',
  resetMocks: true,
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.(js|ts|tsx)', '**/?(*.)+(spec|test).(js|ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        //the content you'd placed at "global"
        babel: true,
        tsConfig: '<rootDir>/tsconfig.json',
      },
    ],
    '^.+\\.(ts|js|tsx|jsx)$': 'ts-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    //'^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
