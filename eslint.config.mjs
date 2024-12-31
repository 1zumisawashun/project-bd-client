import pluginCustomRules from 'eslint-plugin-custom-rules'
import pluginStorybook from 'eslint-plugin-storybook'
import pluginTestingLibrary from 'eslint-plugin-testing-library'
import pluginReact from 'eslint-plugin-react'
import pluginNext from '@next/eslint-plugin-next'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginImport from 'eslint-plugin-import'
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
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

/** @type {import("eslint").Linter.Config[]} */

const jsConfig = [
  {
    name: 'js recommended',
    files: ['**/*.ts'],
    ...eslint.configs.recommended,
  },
  {
    name: 'js recommended override',
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "Don't declare enums",
        },
      ],
    },
  },
]

// eslint-recommendedで特定のファイルにリセットをかけて、recommendedとoverrideで全体のファイルに適用する
const tsConfig = [
  ...tseslint.configs.recommended.map((conf) => ({
    ...conf, // base, eslint-recommended, recommended
  })),
  {
    name: 'ts recommended override',
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]

// configだと以下のようになってpluginだと全部設定する必要があるのか
const nextConfig = [
  {
    name: 'next recommended + core-web-vitals',
    files: ['**/*.{ts,tsx}'],
    plugins: { '@next/next': pluginNext },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules, // recommendedの2つのルールをerrorにする
    },
  },
]

const reactConfig = [
  {
    name: 'react recommended',
    files: ['**/*.{ts,tsx}'],
    // https://github.com/jsx-eslint/eslint-plugin-react#configuration
    settings: {
      react: {
        version: 'detect',
      },
    },
    ...pluginReact.configs.flat.recommended,
  },
  {
    name: 'react recommended override',
    rules: {
      ...pluginReact.configs['jsx-runtime'].rules,
      'react/require-default-props': 'off',
      'react/function-component-definition': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },
]

const reactHooksConfig = [
  {
    name: 'react-hooks recommended',
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': pluginReactHooks },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
]

const jsxA11yConfig = [
  {
    plugins: pluginJsxA11y.flatConfigs.recommended.plugins,
    rules: {
      ...pluginJsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
]

const importConfig = [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: pluginImport.flatConfigs.recommended.plugins,
    rules: {
      ...pluginImport.configs.recommended.rules,
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
    },
  },
]

const testingLibraryConfig = [
  {
    name: 'testing-library recommended',
    files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    ...pluginTestingLibrary.configs['flat/react'],
  },
]

// 多分これはrulesを上書きされないための完成系だと思う
// https://susisu.hatenablog.com/entry/2024/08/14/233156#%E8%87%AA%E5%88%86%E3%81%A7-config-object-%E3%82%92%E3%83%9E%E3%83%BC%E3%82%B8%E3%81%99%E3%82%8B%E9%9A%9B%E3%81%AE%E6%B3%A8%E6%84%8F
const storybookConfig = [
  ...pluginStorybook.configs['flat/recommended'], // setup, stories-rules, main-rules
  {
    name: 'storybook recommended override',
    files: ['*.stories.@(ts|tsx)'],
    rules: {
      'storybook/hierarchy-separator': 'error',
      'storybook/default-exports': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
]

const customRulesConfig = [
  {
    name: 'custom-rules',
    plugins: {
      'custom-rules': pluginCustomRules,
    },
    rules: {
      'custom-rules/require-should-dirty': 'error',
    },
  },
]

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
