import NextAuth from 'next-auth'
import { MIDDLEWARE_ROUTES } from '@/functions/constants/routes'
import authConfig from '@/functions/libs/next-auth/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const {
    API_AUTH_PREFIX,
    PUBLIC_OPTIONS,
    AUTH_OPTIONS,
    DEFAULT_LOGIN_REDIRECT,
  } = MIDDLEWARE_ROUTES

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
  const isPublicRoute = PUBLIC_OPTIONS.includes(nextUrl.pathname)
  const isAuthRoute = AUTH_OPTIONS.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return undefined
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return undefined
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/sign-in', nextUrl))
  }
  return undefined
})

/** @see https://clerk.com/docs/references/nextjs/auth-middleware */
// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// }

/** @see https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
