import { InferQueryModel } from '@/drizzle/types'

export type ArticleDetailArticle = InferQueryModel<
  'articles',
  {
    with: {
      categories: {
        with: {
          category: true
        }
      }
      likedUsers: {
        with: {
          user: {
            columns: {
              id: true
            }
          }
        }
      }
    }
  }
>
