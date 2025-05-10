// @ts-expect-error
import pluginImport from 'eslint-plugin-import'
import pluginStorybook from 'eslint-plugin-storybook'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...pluginStorybook.configs['flat/recommended'],
  {
    name: 'eslint-plugin-storybook:override',
    files: ['*.stories.@(ts|tsx)'],
    rules: {
      'storybook/hierarchy-separator': 'error',
      'storybook/default-exports': 'off',
    },
  },
  {
    name: 'eslint-plugin-custom-rules/configs/storybook:override',
    files: ['*.stories.@(ts|tsx)'],
    plugins: { import: pluginImport },
    rules: {
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
]
