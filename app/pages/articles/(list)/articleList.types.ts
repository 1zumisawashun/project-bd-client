import { InferQueryModel } from '@/drizzle/types'

export type ArticleListArticle = InferQueryModel<
  'articles',
  {
    with: {
      author: true
    }
  }
>
