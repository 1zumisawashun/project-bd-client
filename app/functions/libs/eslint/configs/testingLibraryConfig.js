import pluginTestingLibrary from 'eslint-plugin-testing-library'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'testing-library recommended',
    files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    ...pluginTestingLibrary.configs['flat/react'],
  },
]
