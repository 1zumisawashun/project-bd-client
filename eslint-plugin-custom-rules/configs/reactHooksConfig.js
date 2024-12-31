import pluginReactHooks from 'eslint-plugin-react'

/** @type {import("eslint").Linter.Config[]} */
export const reactHooksConfig = [
  {
    name: 'react-hooks recommended',
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': pluginReactHooks },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
]
