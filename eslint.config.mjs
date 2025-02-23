import customRules from 'eslint-plugin-custom-rules/configs/custom-rules.mjs'
import eslint from 'eslint-plugin-custom-rules/configs/eslint.mjs'
import next from 'eslint-plugin-custom-rules/configs/next.mjs'
import prettier from 'eslint-plugin-custom-rules/configs/prettier.mjs'
import react from 'eslint-plugin-custom-rules/configs/react.mjs'
import storybook from 'eslint-plugin-custom-rules/configs/storybook.mjs'
import testingLibrary from 'eslint-plugin-custom-rules/configs/testing-library.mjs'
import typescript from 'eslint-plugin-custom-rules/configs/typescript.mjs'

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
  ...eslint,
  ...prettier,
  ...typescript,
  ...react,
  ...next,
  ...storybook,
  ...testingLibrary,
  ...customRules,
]
