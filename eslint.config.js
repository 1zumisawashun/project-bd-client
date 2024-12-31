import jsConfig from './app/functions/libs/eslint/configs/jsConfig.js'
import tsConfig from './app/functions/libs/eslint/configs/tsConfig.js'
import reactConfig from './app/functions/libs/eslint/configs/reactConfig.js'
import reactHooksConfig from './app/functions/libs/eslint/configs/reactHooksConfig.js'
import nextConfig from './app/functions/libs/eslint/configs/nextConfig.js'
import jsxA11yConfig from './app/functions/libs/eslint/configs/jsxA11yConfig.js'
import importConfig from './app/functions/libs/eslint/configs/importConfig.js'
import storybookConfig from './app/functions/libs/eslint/configs/storybookConfig.js'
import testingLibraryConfig from './app/functions/libs/eslint/configs/testingLibraryConfig.js'
import customRulesConfig from './app/functions/libs/eslint/configs/customRulesConfig.js'
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
