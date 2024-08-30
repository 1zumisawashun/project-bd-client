'use server'

import { signIn as NextAuthSignIn } from '@/functions/libs/next-auth/auth'
import { AuthError } from 'next-auth'
import { ActionsResult } from '@/functions/types'
import { Schema } from './signIn.schema'

export const signIn = async ({
  email,
  password,
}: Schema): Promise<ActionsResult> => {
  try {
    await NextAuthSignIn('credentials', { email, password, redirect: false })

    return {
      isSuccess: true,
      message: 'ログインに成功しました',
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            error: {
              message: 'メールアドレスまたはパスワードが間違っています',
            },
          }
        default:
          return {
            isSuccess: false,
            error: {
              message: 'ログインに失敗しました',
            },
          }
      }
    }

    throw error
  }
}
