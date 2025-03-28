import { DefaultSession } from 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: 'USER' | 'ADMIN'
      expires: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: 'USER' | 'ADMIN'
  }
}
