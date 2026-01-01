'use server'

import { updateArticle } from '@/functions/db/article'
import { actionResult } from '@/functions/helpers/utils'
import { auth } from '@/functions/libs/next-auth/auth'
import { ActionsResult, Article } from '@/functions/types'

type Return = ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>

export const draftArticle = async ({ id }: { id: string }): Promise<Return> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return actionResult.end('ログインしてください')
    }

    const params = { status: 'DRAFT' }
    const response = await updateArticle({ id, data: params })
    if (!response) {
      throw new Error('Failed to draft article')
    }
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

// Contains AI-generated edits.
