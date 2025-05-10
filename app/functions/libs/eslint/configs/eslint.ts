import eslint from '@eslint/js'
// @ts-expect-error
import pluginImport from 'eslint-plugin-import'

import type { Linter } from 'eslint'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'eslint',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...eslint.configs.recommended.rules,
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "Don't declare enums",
        },
        {
          selector:
            "TSTypeLiteral > TSPropertySignature[key.name='children'] > TSTypeAnnotation > TSTypeReference:matches([typeName.name='ReactNode'], [typeName.left.name='React'][typeName.right.name='ReactNode'])",
          message: 'Use PropsWithChildren instead of manually typing children.',
        },
      ],
    },
  },
  {
    ...pluginImport.flatConfigs.recommended,
    name: 'eslint-plugin-import',
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...pluginImport.flatConfigs.recommended.rules,
      // NOTE: https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
    },
  },
] as Linter.Config[]
