export type ActionsResult<T> =
  | {
      isSuccess: true
      data: T
      message: string
    }
  | {
      isSuccess: false
      data: null
      error: {
        message: string
      }
    }

export const actionResult = {
  end: (error: unknown) => {
    console.error(error, 'actionResult end')
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
  },
  success: <T>(response: T) => {
    console.log(response, 'actionResult success')
    return {
      isSuccess: true as const,
      data: response,
      message: '成功しました',
    }
  },
  error: (error: unknown) => {
    console.error(error, 'actionResult error')
    return {
      isSuccess: false as const,
      data: null,
      error: { message: (error as Error)?.message ?? '失敗しました' },
    }
  },
}
