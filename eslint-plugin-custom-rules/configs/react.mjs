import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ...pluginReact.configs.flat.recommended,
    name: 'react recommended + jsx-runtime',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReact.configs.flat['jsx-runtime'].rules,
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
    name: 'react-hooks recommended',
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': pluginReactHooks },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    ...pluginJsxA11y.flatConfigs.recommended,
    name: 'jsx-a11y recommended',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...pluginJsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
]
