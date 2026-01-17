'use server'

import { deleteArticle as _deleteArticle } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/actionResult'
import { auth } from '@/functions/libs/next-auth/auth'

type DeleteArticleArgs = {
  id: string
}

export const deleteArticle = async ({ id }: DeleteArticleArgs) => {
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
