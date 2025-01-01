import pluginStorybook from 'eslint-plugin-storybook'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...pluginStorybook.configs['flat/recommended'], // setup, stories-rules, main-rules
  {
    name: 'storybook recommended override',
    files: ['*.stories.@(ts|tsx)'],
    rules: {
      'storybook/hierarchy-separator': 'error',
      'storybook/default-exports': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
]
