import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules', 'dist', 'build.cjs'],
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'prettier/prettier': 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'OptionalMemberExpression',
          message: 'The optional chaining operator (?.) is not allowed.',
        },
        {
          selector: 'OptionalCallExpression',
          message: 'The optional chaining operator (?.) is not allowed.',
        },
      ],
      'node/no-unsupported-features/es-syntax': [
        'error',
        { version: '>=18.0.0', ignores: ['modules'] },
      ],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
