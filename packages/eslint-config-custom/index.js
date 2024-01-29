module.exports = {
  env: {
    node: true,
  },
  extends: [
    /*
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    '../../node_modules/eslint-config-airbnb/rules/react.js',
    '../../node_modules/eslint-config-airbnb/rules/react-a11y.js',
    '../../node_modules/eslint-config-airbnb/rules/react-hooks.js',
    '../../node_modules/eslint-config-airbnb-base/rules/best-practices.js',
    '../../node_modules/eslint-config-airbnb-base/rules/errors.js',
    '../../node_modules/eslint-config-airbnb-base/rules/node.js',
    '../../node_modules/eslint-config-airbnb-base/rules/style.js',
    '../../node_modules/eslint-config-airbnb-base/rules/variables.js',
    '../../node_modules/eslint-config-airbnb-base/rules/es6.js',

     */
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:perfectionist/recommended-natural',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'prettier',
    'import',
    'unused-imports',
    'jest',
    'perfectionist',
  ],
  rules: {
    '@typescript-eslint/dot-notation': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-implicit-any-catch': 1,
    '@typescript-eslint/no-implied-eval': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-throw-literal': 0,
    '@typescript-eslint/no-undef': 0,
    '@typescript-eslint/return-await': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: [['builtin', 'external'], 'internal', ['sibling']],
        'newlines-between': 'always',
        pathGroups: [
          {
            group: 'external',
            pattern: 'react',
            position: 'before',
          },
          {
            group: 'internal',
            pattern: '@/**',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal', 'react'],
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'sort-imports': [
      'error',
      { ignoreCase: true, ignoreDeclarationSort: true },
    ],
  },
};
