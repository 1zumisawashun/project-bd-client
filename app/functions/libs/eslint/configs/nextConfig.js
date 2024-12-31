import pluginNext from '@next/eslint-plugin-next'

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    name: 'next recommended + core-web-vitals',
    files: ['**/*.{ts,tsx}'],
    plugins: { '@next/next': pluginNext },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules, // recommendedの2つのルールをerrorにする
    },
  },
]
