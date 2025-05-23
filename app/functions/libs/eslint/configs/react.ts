// @ts-expect-error
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
// @ts-expect-error
import pluginReactHooks from 'eslint-plugin-react-hooks'

import type { Linter } from 'eslint'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ...pluginReact.configs.flat['recommended'],
    name: 'eslint-plugin-react',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...pluginReact.configs.flat['recommended']?.rules,
      ...pluginReact.configs.flat['jsx-runtime']?.rules,
      'react/require-default-props': 'off',
      'react/function-component-definition': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/self-closing-comp': 'error',
    },
    // https://github.com/jsx-eslint/eslint-plugin-react#configuration
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    name: 'eslint-plugin-react-hooks',
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': pluginReactHooks },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    ...pluginJsxA11y.flatConfigs.recommended,
    name: 'eslint-plugin-jsx-a11y',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...pluginJsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
] as Linter.Config[]
