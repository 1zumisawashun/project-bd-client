'use server'

import { updateArticle } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/actionResult'
import { auth } from '@/functions/libs/next-auth/auth'

type PublishArticleArgs = {
  id: string
}

export const publishArticle = async ({ id }: PublishArticleArgs) => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return actionResult.end('ログインしてください')
    }

    const params = { status: 'PUBLISHED' }
    const response = await updateArticle({ id, data: params })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
