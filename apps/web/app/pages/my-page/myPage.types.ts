import { InferQueryModel } from '@/functions/libs/drizzle/types'

export type MypageUser = InferQueryModel<
  'users',
  {
    with: {
      posts: {
        with: {
          author: true
        }
      }
      likedArticles: {
        with: {
          article: {
            with: {
              author: true
            }
          }
        }
      }
    }
  }
>
