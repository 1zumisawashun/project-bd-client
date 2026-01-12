import { getUserByEmail } from '@/functions/db/user'
import { isPasswordValid } from '@/functions/helpers/hash'
import db from '@/functions/libs/drizzle/client'
import { accounts, sessions, users } from '@/functions/libs/drizzle/schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { NextAuthConfig } from 'next-auth'
import authConfig from './auth.config'

type Credentials = {
  email: string
  password: string
}

/**
 * NOTE:
 * 標準出力で検査し、authorize > signIn > jwt > session の順で呼ばれていることを確認済み
 * 呼び出しのタイミングではなくドキュメントの配置順を参考にしてコールバックを定義している @see https://next-auth.js.org/configuration/callbacks
 */
const callbacks = {
  // NOTE: credentials は authorize の返り値を受け取る
  async signIn({ credentials }) {
    // console.log('signIn callback', { credentials })

    // FIXME: 型定義が不十分なので type assertion で対応する。next-auth.d に型定義を追加するべき
    const { email, password } = credentials as Credentials
    if (!email) throw new Error('No email found on user')
    if (!password) throw new Error('No password found on user')

    const response = await getUserByEmail({ email })
    if (!response?.hashedPassword) throw new Error('User has no password')

    const passwordValid = await isPasswordValid(
      password,
      response.hashedPassword,
    )
    if (!passwordValid) throw new Error('Incorrect password')
    return true
  },
  redirect({ baseUrl }) {
    // console.log('redirect callback', { baseUrl })
    return baseUrl
  },
  /**
   * NOTE:
   * jwt コールバックが呼ばれた後に実行される
   * session オブジェクトを精査・加工できる（今回は session.user を jwt の返り値で上書きする形で対応）
   * session.expires は getServerSession で取得することができない @see https://github.com/nextauthjs/next-auth/discussions/8907
   * next-authの公式ドキュメントでも触れられている（This means that the expires value is stripped away from session in Server Components.） @see https://next-auth.js.org/configuration/nextjs#in-app-directory
   */
  session({ token, session }) {
    // console.log('session callback', { token, session, user })
    session.user.id = token.id
    session.user.role = token.role
    return session
  },
  /**
   * NOTE:
   * jwt コールバックでは 返り値になる token の情報を精査し、必要に応じて情報を追加・更新することができる
   * user は authorize の返り値を受け取る
   * user は新しい session でこのコールバックが「最初に呼び出されたときのみ」渡される
   * user の情報を session でも利用したい場合は jwtの返り値に含める必要がある（今回は token を上書きする形で対応）
   */
  async jwt({ token, user, trigger }) {
    // console.log('jwt callback', { token, user, trigger })
    if (trigger === 'signIn' && user.email) {
      // user は signIn 時にしか存在しない
      const response = await getUserByEmail({ email: user.email })
      token.id = response?.id ?? ''
      token.role = (response?.role as 'USER' | 'ADMIN') ?? 'USER'
    }
    return token
  },
} satisfies NextAuthConfig['callbacks']

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  session: { strategy: 'jwt' },
  callbacks,
  ...authConfig,
})
