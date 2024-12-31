import eslint from '@eslint/js'

/** @type {import("eslint").Linter.Config[]} */
export const jsConfig = [
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
