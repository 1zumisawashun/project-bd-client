import customRules from './app/functions/libs/eslint/configs/customRules.mjs'
import eslint from './app/functions/libs/eslint/configs/eslint.mjs'
import next from './app/functions/libs/eslint/configs/next.mjs'
import prettier from './app/functions/libs/eslint/configs/prettier.mjs'
import react from './app/functions/libs/eslint/configs/react.mjs'
import storybook from './app/functions/libs/eslint/configs/storybook.mjs'
import testingLibrary from './app/functions/libs/eslint/configs/testingLibrary.mjs'
import typescript from './app/functions/libs/eslint/configs/typescript.mjs'

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
