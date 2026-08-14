import oxlint from 'eslint-plugin-oxlint'
import pluginCustomRules from './app/functions/libs/eslint'
import eslint from './app/functions/libs/eslint/configs/eslint'
import next from './app/functions/libs/eslint/configs/next'
import prettier from './app/functions/libs/eslint/configs/prettier'
import react from './app/functions/libs/eslint/configs/react'
import storybook from './app/functions/libs/eslint/configs/storybook'
import testingLibrary from './app/functions/libs/eslint/configs/testing-library'
import typescript from './app/functions/libs/eslint/configs/typescript'

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
      '**/.storybook/',
      '**/jest.setup.ts',
      'app/functions/libs/eslint/configs/**/*.ts',
      'next.config.mjs',
      'eslint.config.ts',
    ],
  },
  ...typescriptReactConfig,
  ...storybookConfig,
  ...testingLibraryConfig,
  ...customRulesConfig,
  ...prettierConfig,
  ...oxlint.buildFromOxlintConfigFile('./.oxlintrc.json'),
]
