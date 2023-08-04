/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-ignore
const importRules = require('eslint-config-airbnb-base/rules/imports');
// @ts-ignore
const styleRules = require('eslint-config-airbnb-base/rules/style');

module.exports = {
  root: true,
  env: {
    es2021: true,
    commonjs: true,
    es6: true,
    node: true,
    browser: true,
  },
  globals: {
    window: true,
    process: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-import', 'jest'],
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/default-param-last': 'error',

    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'objectLiteralProperty',
        format: null,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    camelcase: 'off',
    'default-case': 'off',
    'default-param-last': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: __dirname,
        devDependencies: [
          ...importRules.rules['import/no-extraneous-dependencies'][1]
            .devDependencies,
          '**/*.test.ts',
          '**/.eslintrc.js',
          '**/jest.config.ts',
          '**/jest.*.config.ts',
          '**/test/**/*.ts',
          '**/__functional__/**',
          '**/__stories__/**',
          '**/test/**',
          '**/seed/**',
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'reflect-metadata',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/utils/setup-env',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: './setup-env',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroupsExcludedImportTypes: ['reflect-metadata'],
        warnOnUnassignedImports: true,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        comments: 120,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-console': 'warn',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      // Extend the default rules for 'no-restricted-syntax' as defined in
      // eslint-config-airbnb-base. We do this so that other packages in
      // this repo, can extend from this root config, instead of importing
      // eslint-config-airbnb-base
      styleRules.rules['no-restricted-syntax'][1],
    ],
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    semi: ['error', 'always'],
    'jest/no-focused-tests': 'error',
    'no-restricted-exports': [
      'error',
      {
        restrictedNamedExports: ['then'],
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__typename'],
      },
    ],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error',
  },
  overrides: [
    {
      files: ['**/error.ts', '**/errors.ts'],
      rules: {
        'max-classes-per-file': 'off',
      },
    },
    {
      files: ['test/factories/*.ts'],
      rules: {
        'no-param-reassign': 'off',
      },
    },
    {
      files: [
        '**/*Repository.ts',
        '**/*Resolver.ts',
        '**/migration/**',
        '**/*Controller.ts',
      ],
      rules: {
        'class-methods-use-this': 'off',
      },
    },
    {
      files: ['**/types.ts'],
      rules: {
        'max-classes-per-file': 'off',
      },
    },
    {
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: 'tsconfig.json',
      },
    },
  ],
};
