'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { type PropsWithChildren, useEffect } from 'react'
import { MIDDLEWARE_ROUTES } from '@/functions/constants/routes'

/**
 * RouteProvider - Node Runtime対応のルート保護コンポーネント
 * 
 * middleware.tsの代替として、クライアント側でルーティング制御を行います。
 * Edge Runtimeの制約を回避し、Node Runtimeで動作します。
 */
export const RouteProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()

  const {
    API_AUTH_PREFIX,
    PUBLIC_OPTIONS,
    AUTH_OPTIONS,
    DEFAULT_LOGIN_REDIRECT,
  } = MIDDLEWARE_ROUTES

  useEffect(() => {
    // セッションの読み込み中は何もしない
    if (status === 'loading') {
      return
    }

    const isLoggedIn = !!session
    const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX)
    const isPublicRoute = PUBLIC_OPTIONS.includes(pathname)
    const isAuthRoute = AUTH_OPTIONS.includes(pathname)

    // API認証ルートの場合は何もしない
    if (isApiAuthRoute) {
      return
    }

    // 認証ルート（ログイン・サインアップページなど）の場合
    if (isAuthRoute) {
      // ログイン済みの場合はデフォルトのログイン後ページにリダイレクト
      if (isLoggedIn) {
        router.replace(DEFAULT_LOGIN_REDIRECT)
      }
      return
    }

    // 未認証で非公開ルートにアクセスしようとした場合
    if (!isLoggedIn && !isPublicRoute) {
      router.replace('/sign-in')
    }
  }, [
    pathname,
    session,
    status,
    router,
    API_AUTH_PREFIX,
    PUBLIC_OPTIONS,
    AUTH_OPTIONS,
    DEFAULT_LOGIN_REDIRECT,
  ])

  return <>{children}</>
}
