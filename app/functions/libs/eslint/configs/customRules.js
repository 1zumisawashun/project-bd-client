import pluginCustomRules from 'eslint-plugin-custom-rules'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'custom-rules',
    plugins: { 'custom-rules': pluginCustomRules },
    rules: {
      'custom-rules/require-should-dirty': 'error',
    },
  },
]
