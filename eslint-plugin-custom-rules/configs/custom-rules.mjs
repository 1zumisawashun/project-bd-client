import pluginCustomRules from 'eslint-plugin-custom-rules'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'custom-rules',
    files: ['**/*.{ts,tsx}'],
    plugins: { 'custom-rules': pluginCustomRules },
    rules: {
      'custom-rules/require-should-dirty': 'error',
      'custom-rules/require-satisfies-for-refetch-variables': 'error',
    },
  },
]
