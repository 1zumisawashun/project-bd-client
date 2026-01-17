'use server'

import { updateArticle } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/actionResult'
import { auth } from '@/functions/libs/next-auth/auth'

type DraftArticleArgs = {
  id: string
}

export const draftArticle = async ({ id }: DraftArticleArgs) => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return actionResult.end('ログインしてください')
    }

    const params = { status: 'DRAFT' }
    const response = await updateArticle({ id, data: params })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
