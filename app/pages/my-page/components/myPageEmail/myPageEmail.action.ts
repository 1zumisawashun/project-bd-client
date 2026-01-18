'use server'

import { getUserByEmail, updateUserByEmail } from '@/functions/db/user'
import { actionResult } from '@/functions/helpers/actionResult'
import { getSession } from '@/functions/libs/next-auth/session'
import { Schema, schema } from './myPageEmail.schema'

type UpdateEmailArgs = {
  data: Schema
}

export const updateEmail = async (args: UpdateEmailArgs) => {
  try {
    const session = await getSession()

    if (!session?.user.email) {
      return actionResult.end('ログインしてください')
    }

    const validatedFields = schema.safeParse(args.data)
    const { success, error, data } = validatedFields

    if (!success) {
      return actionResult.end(error.message)
    }

    const existingUser = await getUserByEmail({ email: data.email })

    if (existingUser) {
      actionResult.end('このメールアドレスは既に登録されています')
    }

    const response = await updateUserByEmail({
      email: session.user.email,
      data,
    })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
