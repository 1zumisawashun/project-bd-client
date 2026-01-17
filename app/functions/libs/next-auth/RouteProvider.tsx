'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { type PropsWithChildren, useEffect } from 'react'
import { MIDDLEWARE_ROUTES } from '@/functions/constants/routes'

/**
 * RouteProvider - Node Runtime対応のルート保護コンポーネント
 * 
 * ## 概要
 * middleware.tsの代替として、クライアント側でルーティング制御を行います。
 * Edge Runtimeの制約を回避し、Node Runtimeで動作します。
 * 
 * ## 背景
 * Next.jsのmiddlewareはEdge Runtimeで実行されるため、
 * SQLiteなどのNode.js専用機能との互換性に問題があります。
 * このコンポーネントはクライアント側でルーティングロジックを実行することで、
 * 同じ機能をNode Runtimeで実現します。
 * 
 * ## 機能
 * - 認証状態に基づいてルートアクセスを制御
 * - 未認証ユーザーを保護されたルートからリダイレクト
 * - 認証済みユーザーを認証ページ（ログイン等）からリダイレクト
 * - パブリックルートは認証なしでアクセス可能
 * 
 * ## 使い方
 * ```tsx
 * import { RouteProvider } from '@/functions/libs/next-auth/RouteProvider'
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <SessionProvider>
 *       <RouteProvider>
 *         {children}
 *       </RouteProvider>
 *     </SessionProvider>
 *   )
 * }
 * ```
 * 
 * ## middleware.tsとの違い
 * | 項目 | middleware.ts | RouteProvider.tsx |
 * |------|--------------|-------------------|
 * | Runtime | Edge Runtime | Node Runtime (Client) |
 * | 実行タイミング | リクエスト前 | 初回レンダリング後 |
 * | リダイレクト方法 | Response.redirect | router.replace() |
 * | Node.js機能 | 制限あり | 完全にサポート |
 * | SEO影響 | なし | 初回レンダリング時にコンテンツが表示される可能性 |
 * 
 * @see middleware.ts - Edge Runtime版
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
