'use server'

import { deleteArticle as _deleteArticle } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/utils'
import { auth } from '@/functions/libs/next-auth/auth'
import { ActionsResult, Article } from '@/functions/types'

type Return = ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>

export const deleteArticle = async ({
  id,
}: {
  id: string
}): Promise<Return> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      actionResult.end('ログインしてください')
    }

    const response = await _deleteArticle({ id })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
