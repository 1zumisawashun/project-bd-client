'use server'

import { updateUser } from '@/functions/db/user'
import { actionResult } from '@/functions/helpers/utils'
import { auth } from '@/functions/libs/next-auth/auth'
import { ActionsResult, User } from '@/functions/types'
import { ProfileSchema, profileSchema } from './myPageProfile.schema'

type Return = ActionsResult<Omit<User, 'posts' | 'likedArticles'>>

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
