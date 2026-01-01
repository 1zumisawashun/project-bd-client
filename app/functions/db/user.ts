import db from '@/../drizzle'
import { users, articles, usersToLikedArticles } from '@/../drizzle/schema'
import { eq } from 'drizzle-orm'

export const getUserByEmail = async ({ email }: { email: string }) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    return user ?? null
  } catch {
    return null
  }
}

export const getUserById = async ({ id }: { id: string }) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    if (!user) return null

    // Get user's posts with author name
    const posts = await db
      .select({
        id: articles.id,
        title: articles.title,
        content: articles.content,
        status: articles.status,
        authorId: articles.authorId,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        author: {
          name: users.name,
        },
      })
      .from(articles)
      .leftJoin(users, eq(articles.authorId, users.id))
      .where(eq(articles.authorId, id))

    // Get user's liked articles with author name
    const likedArticles = await db
      .select({
        id: articles.id,
        title: articles.title,
        content: articles.content,
        status: articles.status,
        authorId: articles.authorId,
        createdAt: articles.createdAt,
        updatedAt: articles.updatedAt,
        author: {
          name: users.name,
        },
      })
      .from(usersToLikedArticles)
      .innerJoin(articles, eq(usersToLikedArticles.articleId, articles.id))
      .leftJoin(users, eq(articles.authorId, users.id))
      .where(eq(usersToLikedArticles.userId, id))

    return {
      ...user,
      posts,
      likedArticles,
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
  data: Partial<typeof users.$inferInsert>
}) => {
  try {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    return user
  } catch {
    throw new Error('Failed to update user')
  }
}

// Contains AI-generated edits.
