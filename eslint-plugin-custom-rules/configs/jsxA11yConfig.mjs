import pluginJsxA11y from 'eslint-plugin-jsx-a11y'

/** @type {import("eslint").Linter.Config[]} */
export const jsxA11yConfig = [
  {
    plugins: pluginJsxA11y.flatConfigs.recommended.plugins,
    rules: {
      ...pluginJsxA11y.flatConfigs.recommended.rules,
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
]
