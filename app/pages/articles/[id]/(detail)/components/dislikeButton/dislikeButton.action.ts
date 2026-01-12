'use server'

import { getArticleById } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/utils'
import db from '@/functions/libs/drizzle/client'
import { likedArticles } from '@/functions/libs/drizzle/schema'
import { auth } from '@/functions/libs/next-auth/auth'

type LikeArticleArgs = {
  articleId: string
  userId: string
}

export const likeArticle = async ({ articleId, userId }: LikeArticleArgs) => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return actionResult.end('ログインしてください')
    }

    // Add a like by inserting into junction table
    await db.insert(likedArticles).values({
      articleId,
      userId,
    })

    const article = await getArticleById({ id: articleId })
    if (!article) {
      return actionResult.end('記事が見つかりません')
    }

    const {
      likedUsers: _likedUsers,
      categories: _categories,
      ...articleData
    } = article
    return actionResult.success(articleData)
  } catch (error) {
    return actionResult.error(error)
  }
}
