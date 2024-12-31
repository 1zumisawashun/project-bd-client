import pluginImport from 'eslint-plugin-import'

/** @type {import("eslint").Linter.Config[]} */
export const importConfig = [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: pluginImport.flatConfigs.recommended.plugins,
    rules: {
      ...pluginImport.configs.recommended.rules,
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
    },
  },
]
