import { MENU_ROUTES } from '@/functions/constants/routes'

type GetHierarchicalMenu = { isPrivate: boolean; isAuth: boolean }

type Hierarchical<T> = T | Hierarchical<T>[]

type Menu = { label: string; href: string }

export const getFlatMenu = (user: GetHierarchicalMenu): Menu[] => {
  return recursiveFlat(getHierarchicalMenu(user))
}

const recursiveFlat = <T>(xs: Hierarchical<T>[]): T[] => {
  return xs.flatMap((e) => (Array.isArray(e) ? recursiveFlat(e) : [e]))
}

/** @see https://qiita.com/uhyo/items/ee7fb36c050a934a345f */

const getHierarchicalMenu = ({ isPrivate, isAuth }: GetHierarchicalMenu) => [
  ...MENU_ROUTES.PUBLIC_OPTIONS,
  isAuth ? [...MENU_ROUTES.AUTH_OPTIONS] : [],
  isPrivate ? [...MENU_ROUTES.PRIVATE_OPTIONS] : [],
]
