import { getUserById } from '@/functions/db/user'
import { getArticles, getArticleById } from '@/functions/db/article'

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
