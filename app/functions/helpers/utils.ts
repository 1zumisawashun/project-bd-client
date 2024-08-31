/* eslint-disable no-promise-executor-return */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const genRandomId = () => Math.random().toString(32).substring(2)
