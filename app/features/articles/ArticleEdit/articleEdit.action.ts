'use server'

import { auth } from '@/functions/libs/next-auth/auth'
import { handleError } from '@/functions/helpers/utils'
import { ActionsResult } from '@/functions/types'
import prisma from '@/functions/libs/prisma-client/prisma'
import { Schema, schema } from './articleEdit.schema'

export const editArticle = async (
  data: Schema,
  id: string,
): Promise<ActionsResult> => {
  const session = await auth()

  if (!session?.user.id) {
    return {
      isSuccess: false,
      error: { message: 'ログインしてください' },
    }
  }

  const validatedFields = schema.safeParse(data)

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: { message: validatedFields.error.message },
    }
  }

  try {
    await prisma.article.update({
      where: { id },
      data: {
        ...data,
        status: 'draft',
        author: { connect: { id: session.user.id } },
      },
    })

    return {
      isSuccess: true,
      message: 'ログインに成功しました',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      error: { message: '更新に失敗しました' },
    }
  }
}
