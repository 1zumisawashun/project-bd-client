import tseslint from 'typescript-eslint'

export const tsConfig = [
  ...tseslint.configs.recommended.map((conf) => ({
    ...conf, // base, eslint-recommended, recommended
  })),
  {
    name: 'ts recommended override',
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
]
