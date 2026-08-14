'use server'

import { getArticleById } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/actionResult'
import db from '@/functions/libs/drizzle/client'
import { likedArticles } from '@/functions/libs/drizzle/schema'
import { getSession } from '@/functions/libs/next-auth/session'

type LikeArticleArgs = {
  articleId: string
  userId: string
}

export const likeArticle = async ({ articleId, userId }: LikeArticleArgs) => {
  try {
    const session = await getSession()

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
