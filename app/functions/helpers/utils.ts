/* eslint-disable react-hooks/rules-of-hooks */
import { z } from 'zod'

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const resolve = async <T>(promise: Promise<T>) => {
  try {
    const result = await promise
    return [result, null]
  } catch (error) {
    return [null, error]
  }
}

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

/** @see https://x.com/sujjeeee/status/1837412263432511929?s=12&t=0Bs_ltBYiO3nhiiL9YZAEw */
export const getErrorMessage = (error: unknown) => {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((i) => i.message)
    return errors.join('\n')
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Something went wrong. Please try again later.'
}

// eslint-disable-next-line
export enum DayWeek1 {
  SAN,
  MON,
  TUE,
  WEN = 30,
  THU,
  FRI,
  SAT,
}

// for (const value of DayWeek1) {
//   console.log(value)
// }

const useSampleMutation = ({ refetchQueries }: { refetchQueries: unknown }) => {
  console.log(refetchQueries)
  return [null]
}

const sampleOneId = 'sampleOneId'
const sampleTwoId = 'sampleTwoId'

// tsxファイル内で以下のように使われることを想定

export const [mutation] = useSampleMutation({
  refetchQueries: [
    {
      query: null,
      variables: { sampleOneId }, // satisfiesを強制したい
    },
    {
      query: null,
      variables: { sampleTwoId }, // satisfiesを強制したい
    },
  ],
})

const useSample2Mutation = ({
  refetchQueries,
}: {
  refetchQueries: unknown
}) => {
  console.log(refetchQueries)
  return [null]
}

const refetchQueries = [
  {
    query: null,
    variables: { sampleOneId }, // satisfiesを強制したい
  },
  {
    query: null,
    variables: { sampleTwoId }, // satisfiesを強制したい
  },
]

export const [mutation2] = useSample2Mutation({
  refetchQueries,
})
