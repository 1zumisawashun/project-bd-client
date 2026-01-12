import { ReactNode } from 'react'

const _THEME_OPTIONS = ['primary', 'danger'] as const
export type Theme = (typeof _THEME_OPTIONS)[number] | (string & {})

const _VARIANT_OPTIONS = ['contained', 'outlined', 'ghost'] as const
export type Variant = (typeof _VARIANT_OPTIONS)[number] | (string & {})

const _SIZE_OPTIONS = ['sm', 'md', 'lg'] as const
export type Size = (typeof _SIZE_OPTIONS)[number] | (string & {})

const _SHAPE_OPTIONS = ['rounded', 'circle'] as const
export type Shape = (typeof _SHAPE_OPTIONS)[number] | (string & {})

const _JUSTIFY_OPTIONS = ['start', 'center', 'end'] as const
export type Justify = (typeof _JUSTIFY_OPTIONS)[number] | (string & {})

const _ALIGN_OPTIONS = ['start', 'center', 'end'] as const
export type Align = (typeof _ALIGN_OPTIONS)[number] | (string & {})

const _ACTION_OPTIONS = ['delete'] as const
export type Action = (typeof _ACTION_OPTIONS)[number]

export type Toast = {
  id: string
  theme: Theme
  title: ReactNode
  description?: ReactNode
  isOpen: boolean
}
export type SearchParams = Record<string, string | string[] | undefined>

const _ARTICLE_STATUS_OPTIONS = ['PUBLISHED', 'DRAFT'] as const
export type ArticleStatus = (typeof _ARTICLE_STATUS_OPTIONS)[number]

export type ActionsResult<T> =
  | {
      isSuccess: true
      data: T
      message: string
    }
  | {
      isSuccess: false
      data: null
      error: {
        message: string
      }
    }
