import eslint from '@eslint/js'
import pluginImport from 'eslint-plugin-import'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'js recommended',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...eslint.configs.recommended.rules,
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "Don't declare enums",
        },
      ],
    },
  },
  {
    ...pluginImport.flatConfigs.recommended,
    name: 'import recommended',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...pluginImport.flatConfigs.recommended.rules,
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
    },
  },
]
