'use server'

import { auth } from '@/functions/libs/next-auth/auth'
import { handleError } from '@/functions/helpers/utils'
import { ActionsResult, Article, Articles } from '@/functions/types'
import prisma from '@/functions/libs/prisma-client/prisma'

export const deleteArticle = async (
  id: string,
): Promise<ActionsResult<Article | Articles[number]>> => {
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
