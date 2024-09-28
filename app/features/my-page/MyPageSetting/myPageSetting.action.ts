'use server'

import { actionResult } from '@/functions/helpers/utils'
import { ActionsResult, User } from '@/functions/types'
import { auth } from '@/functions/libs/next-auth/auth'
import { updateUser, getUserByEmail } from '@/functions/db/user'
import {
  EmailSchema,
  emailSchema,
  ProfileSchema,
  profileSchema,
} from './myPageSetting.schema'

type Return = ActionsResult<Omit<User, 'posts' | 'likedArticles'>>
export const updateEmail = async ({
  data,
}: {
  data: EmailSchema
}): Promise<Return> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return actionResult.end('ログインしてください')
    }

    const validatedFields = emailSchema.safeParse(data)

    if (!validatedFields.success) {
      return actionResult.end(validatedFields.error.message)
    }

    const existingUser = await getUserByEmail({
      email: validatedFields.data.email,
    })

    if (existingUser) {
      actionResult.end('このメールアドレスは既に登録されています')
    }

    const response = await updateUser({
      id: session.user.id,
      data: validatedFields.data,
    })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

export const updateProfile = async ({
  data,
}: {
  data: ProfileSchema
}): Promise<Return> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return actionResult.end('ログインしてください')
    }

    const validatedFields = profileSchema.safeParse(data)

    if (!validatedFields.success) {
      return actionResult.end(validatedFields.error.message)
    }

    const response = await updateUser({
      id: session.user.id,
      data: validatedFields.data,
    })

    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
