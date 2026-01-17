import { getFlatMenu } from './getFlatMenu'

const parameters = [
  {
    actual: {
      isPrivate: false,
      isAuth: false,
    },
    expected: [
      { href: '/tos', label: '利用規約' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    actual: {
      isPrivate: true,
      isAuth: false,
    },
    expected: [
      { href: '/tos', label: '利用規約' },
      { href: '/faq', label: 'FAQ' },
      { href: '/articles/create', label: '記事作成' },
      { href: '/my-page', label: 'マイページ' },
    ],
  },
  {
    actual: {
      isPrivate: true,
      isAuth: true,
    },
    expected: [
      { href: '/tos', label: '利用規約' },
      { href: '/faq', label: 'FAQ' },
      { href: '/sign-in', label: 'ログイン' },
      { href: '/sign-up', label: '新規登録' },
      { href: '/articles/create', label: '記事作成' },
      { href: '/my-page', label: 'マイページ' },
    ],
  },
]
describe('getFlatMenu', () => {
  it.each(parameters)(
    'returns value when $actual is passed',
    ({ actual, expected }) => {
      expect(getFlatMenu(actual)).toEqual(expected)
    },
  )
})
