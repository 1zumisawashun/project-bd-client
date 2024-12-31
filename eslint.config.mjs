import { jsConfig } from 'eslint-plugin-custom-rules/configs/jsConfig.mjs'
import { tsConfig } from 'eslint-plugin-custom-rules/configs/tsConfig.mjs'
import { reactConfig } from 'eslint-plugin-custom-rules/configs/reactConfig.mjs'
import { reactHooksConfig } from 'eslint-plugin-custom-rules/configs/reactHooksConfig.mjs'
import { nextConfig } from 'eslint-plugin-custom-rules/configs/nextConfig.mjs'
import { jsxA11yConfig } from 'eslint-plugin-custom-rules/configs/jsxA11yConfig.mjs'
import { importConfig } from 'eslint-plugin-custom-rules/configs/importConfig.mjs'
import { storybookConfig } from 'eslint-plugin-custom-rules/configs/storybookConfig.mjs'
import { testingLibraryConfig } from 'eslint-plugin-custom-rules/configs/testingLibraryConfig.mjs'
import { customRulesConfig } from 'eslint-plugin-custom-rules/configs/customRulesConfig.mjs'
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
 * NOTE: jsConfig, tsConfig は ts ファイルで宣言できるが、jsxA11yConfig は ts ファイルで宣言できない（型ファイルが存在しない）
 * これはルール作成の際に js で書いているためだと思われる。
 *
 * NOTE: mjsへ切り出してnpx eslint --inspect-configしても即時反映されない、おそらく見ている範囲がeslint.config.mjsなのでインポート先までは
 * 見てくれなさそう。リント走らせると即時反映されているのがわかるのでGUIだけ反応しない
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
