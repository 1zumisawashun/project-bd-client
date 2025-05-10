import { parse as _parse } from '@babel/parser'

export const parse = (code: string) =>
  _parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  })
