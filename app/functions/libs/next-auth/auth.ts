import { accounts, sessions, users } from '@/drizzle/schema'
import { getUserByEmail } from '@/functions/db/user'
import { isPasswordValid } from '@/functions/helpers/hash'
import db from '@/functions/libs/drizzle-client/drizzle'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { NextAuthConfig } from 'next-auth'
import authConfig from './auth.config'

type Credentials = {
  email: string
  password: string
}

/**
 * NOTE:
 * 標準出力で検査してauthorize>signIn>jwt>sessionの順で呼ばれていることを確認済み
 * 呼び出しのタイミングではなくドキュメントの配置を参考にしてコールバックを定義している
 * @see https://next-auth.js.org/configuration/callbacks
 */
const callbacks = {
  async signIn({ credentials }) {
    console.log('signIn callback', { credentials })
    // FIXME: 型定義が不十分なのでtype assertionで対応。next-auth.dに型定義を追加するべき
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
   * This callback is called whenever a session is checked. (i.e. when invoking the /api/session endpoint, using useSession or getSession)
   * jwtコールバックが呼ばれた後に実行される
   * session.expiresはgetServerSessionで取得できないぽい
   * @see https://github.com/nextauthjs/next-auth/discussions/8907
   * 公式ドキュメントでも触れられているぽい（This means that the expires value is stripped away from session in Server Components.）
   * @see https://next-auth.js.org/configuration/nextjs#in-app-directory
   */
  session({ token, session, user }) {
    console.log('session callback', { token, session, user })
    session.user.id = token.id
    session.user.role = token.role
    session.user.expires = session.expires
    return session
  },
  /**
   * NOTE:
   * user は authorize の返り値を受け取る。新しい session でこのコールバックが「最初に呼び出されたときのみ」渡される。
   * token は 「最初に呼び出されたときのみ」以降の呼び出しではtokenが使用可能。そのためuserをsessionでも使用したい場合はtokenにuserを追加する必要がある
   * あーだからここでtokenを作るのか、トークン=永続化するための情報を組んでくれってことね
   */
  jwt({ token, user }) {
    console.log('jwt callback', { token, user })
    return { ...token, ...user }
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
