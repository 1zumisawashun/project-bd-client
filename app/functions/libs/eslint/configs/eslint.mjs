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
        {
          selector:
            "TSTypeLiteral > TSPropertySignature[key.name='children'] > TSTypeAnnotation > TSTypeReference:matches([typeName.name='ReactNode'], [typeName.left.name='React'][typeName.right.name='ReactNode'])", // React.ReactNode && ReactNode
          // "TSTypeLiteral > TSPropertySignature[key.name='children'][typeAnnotation.typeAnnotation.typeName.left.name='React'][typeAnnotation.typeAnnotation.typeName.right.name='ReactNode']", // React.ReactNode
          // "TSTypeLiteral > TSPropertySignature[key.name='children'][typeAnnotation.typeAnnotation.typeName.name='ReactNode']", // ReactNode

          message: 'Use PropsWithChildren instead of manually typing children.',
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
      // NOTE: https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
    },
  },
]
