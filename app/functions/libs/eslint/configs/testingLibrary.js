import pluginTestingLibrary from 'eslint-plugin-testing-library'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ...pluginTestingLibrary.configs['flat/react'],
    name: 'testing-library recommended',
    files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  },
]
