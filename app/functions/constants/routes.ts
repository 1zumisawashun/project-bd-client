/**
 * 認証が必要なルートの配列(これらのルートは認証を必要とします)
 */
export const privateRouteOptions = [
  { href: '/articles/create', label: '記事作成' },
  { href: '/my-page', label: 'マイページ' },
]

/**
 * 認証が必要ないルートの配列(これらのルートは認証を必要としません)
 */
export const publicRouteOptions = [
  // { href: '/articles', label: '記事一覧' },
  { href: '/tos', label: '利用規約' },
  { href: '/faq', label: 'FAQ' },
]
export const publicRoutes = [
  '/',
  '/new-verification',
  ...publicRouteOptions.map((d) => d.href),
]

/**
 * 認証に使用されるルートの配列
 */
export const authRouteOptions = [
  { href: '/sign-in', label: 'ログイン' },
  { href: '/sign-up', label: '新規登録' },
]
export const authRoutes = [
  '/auth/new-password',
  '/reset-password',
  '/new-password',
  ...authRouteOptions.map((d) => d.href),
]

/**
 * API認証ルートのプレフィックス
 */
export const apiAuthPrefix = '/api/auth'

/**
 * ログイン後のデフォルトリダイレクトパス
 */
export const DEFAULT_LOGIN_REDIRECT = '/'
