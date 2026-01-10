import db from '@/functions/libs/drizzle-client/drizzle'
import { users } from '@/../drizzle/schema'
import { eq } from 'drizzle-orm'
import type { InsertUser } from '@/../drizzle/schema'

export const getUserByEmail = async ({ email }: { email: string }) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })
    return user || null
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
    
    if (!user) return null
    
    // Transform data to match expected format
    return {
      ...user,
      posts: user.posts,
      likedArticles: user.likedArticles.map((la) => la.article),
    }
  } catch {
    return null
  }
}

export const updateUser = async ({
  id,
  data,
}: {
  id: string
  data: Partial<InsertUser>
}) => {
  try {
    const user = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    return user[0]
  } catch {
    throw new Error('Failed to update user')
  }
}
// Contains AI-generated edits.
