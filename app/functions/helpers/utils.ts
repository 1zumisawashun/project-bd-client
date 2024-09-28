/* eslint-disable no-promise-executor-return */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const genRandomId = () => Math.random().toString(32).substring(2)

export const actionResult = {
  end: (error: unknown) => {
    console.error(error)
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  },
  success: <T>(response: T) => {
    console.log(response)
    return {
      isSuccess: true as const,
      data: response,
      message: '成功しました',
    }
  },
  error: (error: unknown) => {
    console.error(error)
    return {
      isSuccess: false as const,
      data: null,
      error: { message: (error as Error)?.message ?? '失敗しました' },
    }
  },
}
