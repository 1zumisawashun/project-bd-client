import prettier from 'eslint-config-prettier'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'prettier',
    rules: {
      ...prettier.rules,
    },
  },
]
