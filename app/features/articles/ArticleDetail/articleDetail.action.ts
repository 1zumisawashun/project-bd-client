'use server'

import { auth } from '@/functions/libs/next-auth/auth'
import { actionResult } from '@/functions/helpers/utils'
import { ActionsResult, Article } from '@/functions/types'
import {
  deleteArticle as _deleteArticle,
  updateArticle,
} from '@/functions/db/article'

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

    const response = await _deleteArticle(id)
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

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
      actionResult.end('ログインしてください')
    }

    const params = { likedUsers: { connect: { id: userId } } }
    const response = await updateArticle(articleId, params)
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

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
      actionResult.end('ログインしてください')
    }

    const params = { likedUsers: { disconnect: { id: userId } } }
    const response = await updateArticle(articleId, params)
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

export const draftArticle = async ({ id }: { id: string }): Promise<Return> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      actionResult.end('ログインしてください')
    }

    const params = { status: 'DRAFT' }
    const response = await updateArticle(id, params)
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

export const publishArticle = async ({
  id,
}: {
  id: string
}): Promise<Return> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      actionResult.end('ログインしてください')
    }

    const params = { status: 'PUBLISHED' }
    const response = await updateArticle(id, params)
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
