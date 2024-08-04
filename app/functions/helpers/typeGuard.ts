const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

function isNumber(value: any): value is number {
  return typeof value === 'number'
}

const isFile = (file: unknown): file is File => {
  return file instanceof File
}

export { isFile, isNumber, isString }
