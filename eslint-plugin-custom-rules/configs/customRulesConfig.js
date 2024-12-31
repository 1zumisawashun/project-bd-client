import pluginCustomRules from 'eslint-plugin-custom-rules'

/** @type {import("eslint").Linter.Config[]} */
export const customRulesConfig = [
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
