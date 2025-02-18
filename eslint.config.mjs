import customRules from 'eslint-plugin-custom-rules/configs/customRules.mjs'
import eslint from 'eslint-plugin-custom-rules/configs/eslint.mjs'
import next from 'eslint-plugin-custom-rules/configs/next.mjs'
import prettier from 'eslint-plugin-custom-rules/configs/prettier.mjs'
import react from 'eslint-plugin-custom-rules/configs/react.mjs'
import storybook from 'eslint-plugin-custom-rules/configs/storybook.mjs'
import testingLibrary from 'eslint-plugin-custom-rules/configs/testingLibrary.mjs'
import typescript from 'eslint-plugin-custom-rules/configs/typescript.mjs'

const ignores = [
  '**/node_modules/',
  '**/.next/',
  '**/.nuxt/',
  '**/.astro/',
  '**/build/',
  '**/dist/',
  '**/out/',
  '**/public/',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/vite.config.ts',
  '**/next.config.js',
  '**/tsconfig.json',
  'src/env.d.ts',
  '**/*.cjs',
  '**/*.mjs',
  '**/.storybook/**',
  '**/eslint-plugin-custom-rules/tests/',
  '**/eslint-plugin-custom-rules/rules/',
  '**/eslint-plugin-custom-rules/index.js',
  '**/jest.setup.ts',
]

export default [
  { ignores },
  ...eslint,
  ...prettier,
  ...typescript,
  ...react,
  ...next,
  ...storybook,
  ...testingLibrary,
  ...customRules,
]
