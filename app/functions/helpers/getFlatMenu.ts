import {
  authRouteOptions,
  privateRouteOptions,
  publicRouteOptions,
} from '@/functions/constants/routes'

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
  ...publicRouteOptions,
  isAuth ? [...authRouteOptions] : [],
  isPrivate ? [...privateRouteOptions] : [],
]
