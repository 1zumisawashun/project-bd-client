'use server'

import { actionResult } from '@/functions/helpers/utils'
import { getUserByEmail } from '@/functions/db/user'
import prisma from '@/functions/libs/prisma-client/prisma'
import { hashPassword } from '@/functions/helpers/hash'
import { ActionsResult } from '@/functions/types'
import { User } from '@prisma/client'
import { Schema, schema } from './signUp.schema'

type Return = ActionsResult<User>
type Props = { data: Schema }
export const signUp = async ({ data }: Props): Promise<Return> => {
  try {
    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
      return actionResult.end(validatedFields.error.message)
    }

    const existingUser = await getUserByEmail({
      email: validatedFields.data.email,
    })

    if (existingUser) {
      return actionResult.end('このメールアドレスは既に登録されています')
    }

    const hashedPassword = await hashPassword(validatedFields.data.password)

    const response = await prisma.user.create({
      data: { email: validatedFields.data.email, hashedPassword },
    })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
