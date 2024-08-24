'use server'

import { handleError } from '@/functions/helpers/handleError'
import { getUserByEmail } from '@/functions/db/user'
import prisma from '@/functions/libs/prisma-client/prisma'
import { hashPassword } from '@/functions/helpers/hash'
import { ActionsResult } from '@/functions/types'
import { Schema, schema } from './SignUp.schema'

export const signUp = async (values: Schema): Promise<ActionsResult> => {
  const validatedFields = schema.safeParse(values)

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    }
  }

  const { email, password } = validatedFields.data

  try {
    const hashedPassword = await hashPassword(password)
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: 'このメールアドレスは既に登録されています',
        },
      }
    }

    await prisma.user.create({
      data: { email, hashedPassword },
    })

    return {
      isSuccess: true,
      message: 'サインアップに成功しました',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      error: {
        message: 'サインアップに失敗しました',
      },
    }
  }
}
