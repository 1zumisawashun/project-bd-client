import pluginTestingLibrary from 'eslint-plugin-testing-library'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ...pluginTestingLibrary.configs['flat/react'],
    name: 'eslint-plugin-testing-library',
    files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  },
]
