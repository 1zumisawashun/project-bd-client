import eslint from './app/functions/libs/eslint/configs/eslint.js'
import prettier from './app/functions/libs/eslint/configs/prettier.js'
import typescript from './app/functions/libs/eslint/configs/typescript.js'
import react from './app/functions/libs/eslint/configs/react.js'
import next from './app/functions/libs/eslint/configs/next.js'
import storybook from './app/functions/libs/eslint/configs/storybook.js'
import testingLibrary from './app/functions/libs/eslint/configs/testingLibrary.js'
import customRules from './app/functions/libs/eslint/configs/customRules.js'

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
