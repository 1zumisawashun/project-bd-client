'use server'

import { signIn as NextAuthSignIn } from '@/functions/libs/next-auth/auth'
import { AuthError } from 'next-auth'
import { Schema } from './signIn.schema'

type SignInProps = { data: Schema }

export const signIn = async (props: SignInProps) => {
  try {
    await NextAuthSignIn('credentials', props.data)

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
