import db from '@/functions/libs/drizzle-client/drizzle'
import {
  users,
  articles,
  likedUsersToArticles,
} from '@/../../drizzle/schema'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async ({ email }: { email: string }) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })
    return user ?? null
  } catch {
    return null
  }
}
export const getUserById = async ({ id }: { id: string }) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        posts: {
          with: {
            author: {
              columns: {
                name: true,
              },
            },
          },
        },
        likedArticles: {
          with: {
            article: {
              with: {
                author: {
                  columns: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return user ?? null
  } catch {
    return null
  }
}
export const updateUser = async ({
  id,
  data,
}: {
  id: string
  data: Partial<typeof users.$inferInsert>
}) => {
  try {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning()
    return user
  } catch {
    throw new Error('Failed to update user')
  }
}

// Contains AI-generated edits.
