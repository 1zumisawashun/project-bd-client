/* eslint-disable no-promise-executor-return */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const genRandomId = () => Math.random().toString(32).substring(2)

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}
