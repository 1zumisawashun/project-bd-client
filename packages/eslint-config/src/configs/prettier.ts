// @ts-expect-error
import prettier from 'eslint-config-prettier'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'eslint-config-prettier',
    rules: {
      ...prettier.rules,
    },
  },
]
