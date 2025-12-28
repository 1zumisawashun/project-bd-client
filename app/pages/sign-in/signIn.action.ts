'use server'

import { signIn as NextAuthSignIn } from '@/functions/libs/next-auth/auth'
import { AuthError } from 'next-auth'
import { ActionsResult } from '@/functions/types'
import { Schema } from './signIn.schema'

type Return = ActionsResult<null>
type Props = { data: Schema }
export const signIn = async ({ data }: Props): Promise<Return> => {
  try {
    await NextAuthSignIn('credentials', { ...data, redirect: false })

    return {
      isSuccess: true,
      data: null,
      message: 'ログインに成功しました',
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            data: null,
            error: {
              message: 'メールアドレスまたはパスワードが間違っています',
            },
          }
        default:
          return {
            isSuccess: false,
            data: null,
            error: { message: 'ログインに失敗しました' },
          }
      }
    }

    throw error
  }
}
