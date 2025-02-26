// @ts-check
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import json from '@eslint/json';
import tsEslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import packageJson from 'eslint-plugin-package-json/configs/recommended';

const __dirname = dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-restricted-exports
export default tsEslint.config(
  { ignores: ['**/dist/', '**/docs/', '**/coverage/', '**/*.d.ts', 'node_modules'] },
  {
    files: ['**/*.json'],
    ignores: ['**/package-lock.json', '**/package.json'],
    language: 'json/json',
    ...json.configs.recommended,
    rules: {
      ...json.configs.recommended.rules,
      'json/sort-keys': 'error',
    },
  },
  {
    files: ['**/*.jsonc'],
    language: 'json/jsonc',
    ...json.configs.recommended,
    rules: {
      ...json.configs.recommended.rules,
      'json/sort-keys': 'error',
    },
  },
  {
    files: ['**/*.json5'],
    language: 'json/json5',
    ...json.configs.recommended,
    rules: {
      ...json.configs.recommended.rules,
      'json/sort-keys': 'error',
    },
  },
  {
    extends: [
      js.configs.recommended,
      tsEslint.configs.strictTypeChecked,
      tsEslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js'],
        },
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        {
          default: 'generic',
        },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: ['method', 'field'],
            order: 'alphabetically-case-insensitive',
          },
        },
      ],
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          fixToUnknown: true,
        },
      ],
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
      '@typescript-eslint/no-unnecessary-template-expression': 'error',
      '@typescript-eslint/no-unnecessary-type-arguments': 'error',
      '@typescript-eslint/no-unnecessary-type-constraint': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-includes': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/prefer-regexp-exec': 'error',
      '@typescript-eslint/promise-function-async': 'error',
      curly: 'error',
      'max-params': ['error', 2],
      'newline-after-var': 'error',
      'newline-before-return': 'error',
      'no-duplicate-imports': 'error',
      'no-restricted-exports': [
        'error',
        {
          restrictDefaultExports: {
            direct: true,
          },
        },
      ],
      'no-unused-vars': 'off',
      'sort-imports': [
        'error',
        {
          allowSeparatedGroups: true,
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'single', 'multiple'],
        },
      ],
      'sort-keys': [
        'error',
        'asc',
        {
          caseSensitive: false,
          minKeys: 2,
          natural: false,
        },
      ],
      'spaced-comment': 'error',
    },
  },
  packageJson,
  prettier
);
