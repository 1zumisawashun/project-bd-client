import { getUserById } from '@/functions/db/user'
import { getArticles, getArticleById } from '@/functions/db/article'
import { getCategories } from '@/functions/db/category'

const THEME_OPTIONS = ['primary', 'danger'] as const
export type Theme = (typeof THEME_OPTIONS)[number] | (string & {})

const VARIANT_OPTIONS = ['contained', 'outlined', 'ghost'] as const
export type Variant = (typeof VARIANT_OPTIONS)[number] | (string & {})

const SIZE_OPTIONS = ['sm', 'md', 'lg'] as const
export type Size = (typeof SIZE_OPTIONS)[number] | (string & {})

const SHAPE_OPTIONS = ['rounded', 'circle'] as const
export type Shape = (typeof SHAPE_OPTIONS)[number] | (string & {})

const JUSTIFY_OPTIONS = ['start', 'center', 'end'] as const
export type Justify = (typeof JUSTIFY_OPTIONS)[number] | (string & {})

const ALIGN_OPTIONS = ['start', 'center', 'end'] as const
export type Align = (typeof ALIGN_OPTIONS)[number] | (string & {})

const ACTION_OPTIONS = ['delete'] as const
export type Action = (typeof ACTION_OPTIONS)[number]

export type Toast = {
  id: string
  theme: Theme
  title: React.ReactNode
  description?: React.ReactNode
  isOpen: boolean
}

const ARTICLE_STATUS_OPTIONS = ['PUBLISHED', 'DRAFT'] as const
export type ArticleStatus = (typeof ARTICLE_STATUS_OPTIONS)[number]

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

export type User = NonNullable<Awaited<ReturnType<typeof getUserById>>>

export type Articles = NonNullable<Awaited<ReturnType<typeof getArticles>>>

export type Article = NonNullable<Awaited<ReturnType<typeof getArticleById>>>

export type Categories = NonNullable<Awaited<ReturnType<typeof getCategories>>>
