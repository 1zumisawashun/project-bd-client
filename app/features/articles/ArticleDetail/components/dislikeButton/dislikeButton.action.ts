'use server'

import { updateArticle } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/utils'
import { auth } from '@/functions/libs/next-auth/auth'
import { ActionsResult, Article } from '@/functions/types'

type Return = ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>

export const likeArticle = async ({
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

    const params = { likedUsers: { connect: { id: userId } } }
    const response = await updateArticle({ id: articleId, data: params })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
