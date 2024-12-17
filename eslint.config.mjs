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
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
