'use server'

import { auth } from '@/functions/libs/next-auth/auth'
import { handleError } from '@/functions/helpers/utils'
import { ActionsResult, Article } from '@/functions/types'
import prisma from '@/functions/libs/prisma-client/prisma'

export const deleteArticle = async ({
  id,
}: {
  id: string
}): Promise<ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>> => {
  const session = await auth()

  if (!session?.user.id) {
    return {
      isSuccess: false,
      data: null,
      error: { message: 'ログインしてください' },
    }
  }

  try {
    const response = await prisma.article.delete({
      where: { id },
    })

    return {
      isSuccess: true,
      data: response,
      message: '削除に成功しました',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      data: null,
      error: { message: '更新に失敗しました' },
    }
  }
}

export const likeArticle = async ({
  articleId,
  userId,
}: {
  articleId: string
  userId: string
}): Promise<ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>> => {
  const session = await auth()

  if (!session?.user.id) {
    return {
      isSuccess: false,
      data: null,
      error: { message: 'ログインしてください' },
    }
  }

  try {
    const response = await prisma.article.update({
      where: { id: articleId },
      data: {
        likedUsers: { connect: { id: userId } },
      },
    })

    return {
      isSuccess: true,
      data: response,
      message: '投稿に成功しました',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      data: null,
      error: { message: '更新に失敗しました' },
    }
  }
}

export const dislikeArticle = async ({
  articleId,
  userId,
}: {
  articleId: string
  userId: string
}): Promise<ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>> => {
  const session = await auth()

  if (!session?.user.id) {
    return {
      isSuccess: false,
      data: null,
      error: { message: 'ログインしてください' },
    }
  }

  try {
    const response = await prisma.article.update({
      where: { id: articleId },
      data: {
        likedUsers: { disconnect: { id: userId } },
      },
    })

    return {
      isSuccess: true,
      data: response,
      message: '投稿に成功しました',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      data: null,
      error: { message: '更新に失敗しました' },
    }
  }
}
