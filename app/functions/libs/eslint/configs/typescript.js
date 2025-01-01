import tseslint from 'typescript-eslint'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...tseslint.configs.recommended, // base, eslint-recommended, recommended
  {
    name: 'ts recommended override',
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
