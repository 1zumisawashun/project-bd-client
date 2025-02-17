module.exports = {
  rules: {
    'require-should-dirty': require('./rules/require-should-dirty').rule,
    'require-satisfies-to-refetch-queries':
      require('./rules/require-satisfies-to-refetch-queries').rule,
  },
}
