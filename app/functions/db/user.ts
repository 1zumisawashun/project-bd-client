import { users, type InsertUser } from '@/drizzle/schema'
import db from '@/functions/libs/drizzle-client/drizzle'
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

export const getUserByEmailForMypage = async ({ email }: { email: string }) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      with: {
        posts: {
          with: {
            author: true,
          },
        },
        likedArticles: {
          with: {
            article: {
              with: {
                author: true,
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

export const getUserById = async ({ id }: { id: string }) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        posts: {
          with: {
            author: true,
          },
        },
        likedArticles: {
          with: {
            article: {
              with: {
                author: true,
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

export const updateUserByEmail = async ({
  email,
  data,
}: {
  email: string
  data: Partial<InsertUser>
}) => {
  try {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.email, email))
      .returning()
    return user ?? null
  } catch {
    return null
  }
}
