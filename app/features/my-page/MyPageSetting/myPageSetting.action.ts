'use server'

import { handleError } from '@/functions/helpers/utils'
import { ActionsResult } from '@/functions/types'
import { auth } from '@/functions/libs/next-auth/auth'
import { updateUser, getUserByEmail } from '@/functions/db/user'
import {
  EmailSchema,
  emailSchema,
  ProfileSchema,
  profileSchema,
} from './myPageSetting.schema'

export const updateEmail = async (
  data: EmailSchema,
): Promise<ActionsResult> => {
  const session = await auth()

  if (!session?.user.id) {
    return {
      isSuccess: false,
      error: { message: 'ログインしてください' },
    }
  }

  const validatedFields = emailSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: { message: validatedFields.error.message },
    }
  }

  const existingUser = await getUserByEmail(validatedFields.data.email)

  if (existingUser) {
    return {
      isSuccess: false,
      error: { message: 'このメールアドレスは既に登録されています' },
    }
  }

  try {
    await updateUser({ id: session.user.id, data: validatedFields.data })

    return {
      isSuccess: true,
      message: '更新に成功しました',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      error: { message: '更新に失敗しました' },
    }
  }
}

export const updateProfile = async (
  data: ProfileSchema,
): Promise<ActionsResult> => {
  const session = await auth()

  if (!session?.user.id) {
    return {
      isSuccess: false,
      error: { message: 'ログインしてください' },
    }
  }

  const validatedFields = profileSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: { message: validatedFields.error.message },
    }
  }

  try {
    await updateUser({ id: session.user.id, data: validatedFields.data })

    return {
      isSuccess: true,
      message: '更新に成功しました',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      error: { message: '更新に失敗しました' },
    }
  }
}
