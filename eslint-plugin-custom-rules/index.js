module.exports = {
  rules: {
    'require-should-dirty': require('./rules/require-should-dirty').rule,
    'require-satisfies-for-refetch-variables':
      require('./rules/require-satisfies-for-refetch-variables').rule,
  },
}
