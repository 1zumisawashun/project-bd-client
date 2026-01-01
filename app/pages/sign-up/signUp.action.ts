'use server'

import { actionResult } from '@/functions/helpers/utils'
import { getUserByEmail } from '@/functions/db/user'
import db from '@/functions/libs/drizzle-client/drizzle'
import { users } from '@/../../drizzle/schema'
import { hashPassword } from '@/functions/helpers/hash'
import { ActionsResult } from '@/functions/types'
import { Schema, schema } from './signUp.schema'

type Return = ActionsResult<typeof users.$inferSelect>
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
      .values({ email: validatedFields.data.email, hashedPassword })
      .returning()
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}

// Contains AI-generated edits.
