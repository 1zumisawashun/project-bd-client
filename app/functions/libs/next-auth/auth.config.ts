import { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { schema } from '@/pages/sign-in/signIn.schema'

/**
 * NOTE:
 * Next.js の middleware は edge runtime なので signIn が内部的に使っている sqlite が使えない問題への暫定対応 @see https://authjs.dev/guides/edge-compatibility
 * auth.config.ts は edge runtime 対応のために分けている
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
      // console.log('authorize callback', { credentials })
      const { success, data } = schema.safeParse(credentials)
      if (!success) throw new Error('Invalid input')
      return data
    },
  }),
] satisfies NextAuthConfig['providers']

export default {
  providers,
} satisfies NextAuthConfig
