'use server'

import { and, eq } from 'drizzle-orm'
import { getArticleById } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/actionResult'
import db from '@/functions/libs/drizzle/client'
import { likedArticles } from '@/functions/libs/drizzle/schema'
import { auth } from '@/functions/libs/next-auth/auth'

type DislikeArticleArgs = {
  articleId: string
  userId: string
}

export const dislikeArticle = async ({
  articleId,
  userId,
}: DislikeArticleArgs) => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return actionResult.end('ログインしてください')
    }

    // Remove the like by deleting from junction table
    await db
      .delete(likedArticles)
      .where(
        and(
          eq(likedArticles.articleId, articleId),
          eq(likedArticles.userId, userId),
        ),
      )

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
