import { getUserByEmail } from '@/functions/db/user'
import { isPasswordValid } from '@/functions/helpers/hash'
import db from '@/functions/libs/drizzle-client/db'
import * as schema from '@/functions/libs/drizzle-client/schema'
import { schema as signUpSchema } from '@/pages/sign-up/signUp.schema'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

const providers = [
  GitHub,
  Google,
  Credentials({
    // add type to credentials argument
    credentials: {
      email: { type: 'text' },
      password: { type: 'password' },
    },
    async authorize(credentials) {
      const validatedFields = signUpSchema.safeParse(credentials)

      if (validatedFields.success) {
        const { email, password } = validatedFields.data

        const user = await getUserByEmail({ email })
        if (!user?.hashedPassword) return null

        const passwordsMatch = await isPasswordValid(
          password,
          user.hashedPassword,
        )

        if (passwordsMatch) return user
      }

      return null
    },
  }),
] satisfies NextAuthConfig['providers']

/** @see https://next-auth.js.org/configuration/callbacks */
const callbacks = {
  signIn() {
    return true
  },
  redirect({ baseUrl }) {
    return baseUrl
  },
  /**
   * @description This callback is called whenever a session is checked. (i.e. when invoking the /api/session endpoint, using useSession or getSession)
   * jwtコールバックが呼ばれた後に実行される
   * session.expiresはgetServerSessionで取得できないぽい
   * @see https://github.com/nextauthjs/next-auth/discussions/8907
   * 公式ドキュメントでも触れられているぽい（This means that the expires value is stripped away from session in Server Components.）
   * @see https://next-auth.js.org/configuration/nextjs#in-app-directory
   */
  session({ session, token }) {
    session.user.id = token.id
    session.user.role = token.role
    session.user.expires = session.expires
    return session
  },
  /**
   * @description When trigger is "signIn" or "signUp", it will be a subset of JWT, name, email and image will be included.
   * @param {any} user authorizeの返り値を受け取る。新しいsessionでこのコールバックが「最初に呼び出されたときのみ」渡される
   * @param {any} token 「最初に呼び出されたときのみ」以降の呼び出しではtokenが使用可能。そのためuserをsessionでも使用したい場合はtokenにuserを追加する必要がある
   * あーだからここでtokenを作るのか、トークン=永続化するための情報を組んでくれってことね
   */
  jwt({ token, user }) {
    return { ...token, ...user }
  },
} satisfies NextAuthConfig['callbacks']

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: { strategy: 'jwt' },
  providers,
  callbacks,
})

// Contains AI-generated edits.
