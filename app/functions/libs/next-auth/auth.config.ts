import { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { schema } from '@/features/sign-up/SignUp.schema'
import { getUserByEmail } from '@/functions/db/user'
import { isPasswordValid } from '@/functions/helpers/hash'

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      // add type to credentials argument
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = schema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)
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
  ],
} satisfies NextAuthConfig
