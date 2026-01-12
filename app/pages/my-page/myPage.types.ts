import { InferQueryModel } from '@/drizzle/types'

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
