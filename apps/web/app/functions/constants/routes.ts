export { MENU_ROUTES } from '@project-bd-client/ui'

export const MIDDLEWARE_ROUTES = {
  PUBLIC_OPTIONS: [
    '/',
    '/new-verification',
    '/tos',
    '/faq',
  ],
  AUTH_OPTIONS: [
    '/auth/new-password',
    '/reset-password',
    '/new-password',
    '/sign-in',
    '/sign-up',
  ],
  // NOTE: API認証ルートのプレフィックス
  API_AUTH_PREFIX: '/api/auth',
  // NOTE: ログイン後のデフォルトリダイレクトパス
  DEFAULT_LOGIN_REDIRECT: '/',
}
