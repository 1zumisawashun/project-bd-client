export const MENU_ROUTES = {
  // NOTE: 認証が必要なルートの配列(これらのルートは認証を必要とします)
  PRIVATE_OPTIONS: [
    { href: '/articles/create', label: '記事作成' },
    { href: '/my-page', label: 'マイページ' },
  ],
  // NOTE: 認証が必要ないルートの配列(これらのルートは認証を必要としません)
  PUBLIC_OPTIONS: [
    { href: '/tos', label: '利用規約' },
    { href: '/faq', label: 'FAQ' },
  ],
  // NOTE: 認証に使用されるルートの配列
  AUTH_OPTIONS: [
    { href: '/sign-in', label: 'ログイン' },
    { href: '/sign-up', label: '新規登録' },
  ],
}
