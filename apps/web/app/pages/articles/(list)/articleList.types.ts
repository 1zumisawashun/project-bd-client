import { InferQueryModel } from '@/functions/libs/drizzle/types'

export type ArticleListArticle = InferQueryModel<
  'articles',
  {
    with: {
      author: true
    }
  }
>
