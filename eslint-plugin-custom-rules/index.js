'use strict'

module.exports = {
  rules: {
    // 'my-first-rule': require('./rules/my-first-rule').default,
    // 'no-bad-literal': require('./rules/no-bad-literal').default,
    // 'no-omit-utility-type': require('./rules/no-omit-utility-type').rule,
    'require-should-dirty-option':
      require('./rules/require-should-dirty-option').rule,
  },
}
