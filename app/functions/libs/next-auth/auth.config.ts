import { schema } from '@/pages/sign-up/signUp.schema'
import { type NextAuthConfig } from 'next-auth'

import Credentials from 'next-auth/providers/credentials'

/**
 * NOTE:
 * middlewareがedge runtimeなのでsignInで検査時使うsqliteが使えない問題への暫定対応
 * たまにauth.tsとauth.config.tsに分けている理由を忘れるのでメモ
 * @see https://authjs.dev/guides/edge-compatibility
 */
const providers = [
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    /**
     * NOTE:
     * Auth.js の signIn メソッドが呼び出されたときに実行される
     * signIn('credentials', data) の data が credentialsに渡される
     */
    authorize(credentials) {
      // console.log('authorize', { credentials })
      const { success, data } = schema.safeParse(credentials)
      if (!success) throw new Error('Invalid input')
      return data
    },
  }),
] satisfies NextAuthConfig['providers']

export default {
  providers,
} satisfies NextAuthConfig
