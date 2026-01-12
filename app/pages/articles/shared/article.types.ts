import { InferQueryModel } from '@/drizzle/types'

export type ArticleCategory = InferQueryModel<
  'categories',
  {
    columns: {
      id: true
      name: true
    }
  }
>

export type Article = InferQueryModel<
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
