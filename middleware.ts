import {
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
} from '@/functions/constants/routes'
import { auth } from '@/functions/libs/next-auth/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

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
