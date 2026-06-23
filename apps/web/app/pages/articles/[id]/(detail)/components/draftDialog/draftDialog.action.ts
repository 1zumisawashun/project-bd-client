'use server'

import { updateArticle } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/actionResult'
import { getSession } from '@/functions/libs/next-auth/session'

type DraftArticleArgs = {
  id: string
}

export const draftArticle = async ({ id }: DraftArticleArgs) => {
  try {
    const session = await getSession()

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
