import { rule as requireSatisfiesForRefetchVariables } from './rules/require-satisfies-for-refetch-variables'
import { rule as requireShouldDirty } from './rules/require-should-dirty'

const pluginCustomRules = {
  rules: {
    'require-should-dirty': requireShouldDirty,
    'require-satisfies-for-refetch-variables':
      requireSatisfiesForRefetchVariables,
  },
} as const

export default pluginCustomRules
