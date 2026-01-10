'use server'

import { dislikeArticle as _dislikeArticle } from '@/functions/db/article'
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

    const response = await _dislikeArticle({ articleId, userId })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

// Contains AI-generated edits.
