import { jsConfig } from './eslint-plugin-custom-rules/configs/jsConfig'
import { tsConfig } from './eslint-plugin-custom-rules/configs/tsConfig'
import { reactConfig } from './eslint-plugin-custom-rules/configs/reactConfig'
import { reactHooksConfig } from './eslint-plugin-custom-rules/configs/reactHooksConfig'
import { nextConfig } from './eslint-plugin-custom-rules/configs/nextConfig'
import { jsxA11yConfig } from './eslint-plugin-custom-rules/configs/jsxA11yConfig'
import { importConfig } from './eslint-plugin-custom-rules/configs/importConfig'
import { storybookConfig } from './eslint-plugin-custom-rules/configs/storybookConfig'
import { testingLibraryConfig } from './eslint-plugin-custom-rules/configs/testingLibraryConfig'
import { customRulesConfig } from './eslint-plugin-custom-rules/configs/customRulesConfig'
import prettier from 'eslint-config-prettier'

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

/**
 * jsConfig, tsConfig は ts ファイルで宣言できるが、jsxA11yConfig は ts ファイルで宣言できない（型ファイルが存在しない）
 * これはルール作成の際に js で書いているためだと思われる。
 */
export default [
  { ignores },
  ...jsConfig,
  ...tsConfig,
  ...nextConfig,
  ...reactConfig,
  ...reactHooksConfig,
  ...jsxA11yConfig,
  ...importConfig,
  ...storybookConfig,
  ...testingLibraryConfig,
  ...customRulesConfig,
  prettier,
]
