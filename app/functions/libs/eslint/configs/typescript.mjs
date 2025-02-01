import tseslint from 'typescript-eslint'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    name: 'ts recommended override',
    files: ['**/*.{ts,tsx}'],
    rules: {
      // recommended-type-checked
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      // stylistic-type-checked
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
]
