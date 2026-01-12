'use server'

import { updateUserByEmail } from '@/functions/db/user'
import { actionResult } from '@/functions/helpers/utils'
import { auth } from '@/functions/libs/next-auth/auth'
import { Schema, schema } from './myPageProfile.schema'

type UpdateProfileArgs = {
  data: Schema
}

export const updateProfile = async (args: UpdateProfileArgs) => {
  try {
    const session = await auth()

    if (!session?.user.email) {
      return actionResult.end('ログインしてください')
    }

    const validatedFields = schema.safeParse(args.data)
    const { success, error, data } = validatedFields

    if (!success) {
      return actionResult.end(error.message)
    }

    const response = await updateUserByEmail({
      email: session.user.email,
      data: data,
    })

    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
