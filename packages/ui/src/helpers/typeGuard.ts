export const isString = (value: unknown): value is string =>
  typeof value === 'string'

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export const isFile = (file: unknown): file is File => file instanceof File
