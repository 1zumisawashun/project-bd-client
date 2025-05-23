// @ts-expect-error
import pluginNext from '@next/eslint-plugin-next'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'eslint-plugin-next',
    files: ['**/*.{ts,tsx}'],
    plugins: { '@next/next': pluginNext },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
]
