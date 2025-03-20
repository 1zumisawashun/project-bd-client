import eslint from 'eslint-plugin-custom-rules/configs/eslint.mjs'
import next from 'eslint-plugin-custom-rules/configs/next.mjs'
import prettier from 'eslint-plugin-custom-rules/configs/prettier.mjs'
import react from 'eslint-plugin-custom-rules/configs/react.mjs'
import storybook from 'eslint-plugin-custom-rules/configs/storybook.mjs'
import testingLibrary from 'eslint-plugin-custom-rules/configs/testing-library.mjs'
import typescript from 'eslint-plugin-custom-rules/configs/typescript.mjs'

import pluginCustomRules from 'eslint-plugin-custom-rules'

const typescriptReactConfig = [...eslint, ...typescript, ...react, ...next]

const storybookConfig = [...storybook]

const testingLibraryConfig = [...testingLibrary]

const customRulesConfig = [
  {
    name: 'custom-rules',
    files: ['**/*.{ts,tsx}'],
    plugins: { 'custom-rules': pluginCustomRules },
    rules: {
      'custom-rules/require-should-dirty': 'error',
      'custom-rules/require-satisfies-for-refetch-variables': 'error',
    },
  },
]

const prettierConfig = [...prettier]

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      '**/node_modules/',
      '**/.next/',
      '**/public/',
      '**/package-lock.json',
      '**/tsconfig.json',
      '**/*.cjs',
      '**/*.mjs',
      '**/.storybook/',
      '**/jest.setup.ts',
      '**/.lintstagedrc.js',
      '**/eslint-plugin-custom-rules/',
      '!**/eslint-plugin-custom-rules/src/',
    ],
  },
  ...typescriptReactConfig,
  ...storybookConfig,
  ...testingLibraryConfig,
  ...customRulesConfig,
  ...prettierConfig,
]
