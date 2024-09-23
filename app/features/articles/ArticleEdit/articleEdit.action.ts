'use server'

import { auth } from '@/functions/libs/next-auth/auth'
import { handleError } from '@/functions/helpers/utils'
import {
  ActionsResult,
  Article,
  Articles,
  ArticleStatus,
} from '@/functions/types'
import prisma from '@/functions/libs/prisma-client/prisma'
import { Schema, schema } from './articleEdit.schema'

type Props = {
  data: Schema
  id: string
  status: ArticleStatus
}
export const editArticle = async ({
  data,
  id,
  status,
}: Props): Promise<ActionsResult<Article | Articles[number]>> => {
  const session = await auth()

  if (!session?.user.id) {
    return {
      isSuccess: false,
      data: null,
      error: { message: 'ログインしてください' },
    }
  }

  const validatedFields = schema.safeParse(data)

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      data: null,
      error: { message: validatedFields.error.message },
    }
  }

  try {
    const promises = data.categories.map(async ({ name }) => {
      const category = await prisma.category.findFirst({ where: { name } })
      if (!category) {
        const result = await prisma.category.create({ data: { name } })
        return { id: result.id }
      }
      return { id: category.id }
    })

    const categoryIds = await Promise.all(promises)

    const response = await prisma.article.update({
      where: { id },
      data: {
        ...data,
        status,
        author: { connect: { id: session.user.id } },
        categories: { connect: categoryIds },
      },
    })

    return {
      isSuccess: true,
      data: response,
      message: '変更に成功しました',
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
