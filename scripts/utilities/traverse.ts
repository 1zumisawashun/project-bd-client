import _traverse from '@babel/traverse'

/** @see https://github.com/babel/babel/discussions/13093 */
export const traverse = process.env['TEST']
  ? _traverse
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    ((_traverse as any).default as typeof _traverse)
