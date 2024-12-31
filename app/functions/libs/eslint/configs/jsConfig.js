import eslint from '@eslint/js'

export default [
  {
    name: 'js recommended',
    files: ['**/*.ts'],
    ...eslint.configs.recommended,
  },
  {
    name: 'js recommended override',
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "Don't declare enums",
        },
      ],
    },
  },
]
