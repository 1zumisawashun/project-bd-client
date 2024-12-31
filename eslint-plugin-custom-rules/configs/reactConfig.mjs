import pluginReact from 'eslint-plugin-react'

/** @type {import("eslint").Linter.Config[]} */
export const reactConfig = [
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
      ...pluginReact.configs.flat['jsx-runtime'].rules,
      'react/require-default-props': 'off',
      'react/function-component-definition': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
]
