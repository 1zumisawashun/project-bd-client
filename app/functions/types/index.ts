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
