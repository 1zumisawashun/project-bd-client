'use server'

import { getArticleById } from '@/functions/db/article'
import db from '@/functions/libs/drizzle-client/drizzle'
import { likedArticles } from '@/../drizzle/schema'
import { and, eq } from 'drizzle-orm'
import { actionResult } from '@/functions/helpers/utils'
import { auth } from '@/functions/libs/next-auth/auth'
import { ActionsResult, Article } from '@/functions/types'

type Return = ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>

export const dislikeArticle = async ({
  articleId,
  userId,
}: {
  articleId: string
  userId: string
}): Promise<Return> => {
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
          eq(likedArticles.userId, userId)
        )
      )

    const article = await getArticleById({ id: articleId })
    if (!article) {
      return actionResult.end('記事が見つかりません')
    }

    const { likedUsers, categories, ...articleData } = article
    return actionResult.success(articleData)
  } catch (error) {
    return actionResult.error(error)
  }
}
// Contains AI-generated edits.
