'use server'

import { actionResult } from '@/functions/helpers/utils'
import { getUserByEmail } from '@/functions/db/user'
import db from '@/../drizzle'
import { users, User } from '@/../drizzle/schema'
import { hashPassword } from '@/functions/helpers/hash'
import { ActionsResult } from '@/functions/types'
import { Schema, schema } from './signUp.schema'
import { createId } from '@paralleldrive/cuid2'

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

    const [response] = await db
      .insert(users)
      .values({
        id: createId(),
        email: validatedFields.data.email,
        hashedPassword,
      })
      .returning()

    if (!response) {
      throw new Error('Failed to create user')
    }

    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

// Contains AI-generated edits.
