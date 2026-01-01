import db from '@/functions/libs/drizzle-client/db'
import {
  articles,
  users,
  categories,
  articlesToCategories,
  usersToLikedArticles,
} from '@/functions/libs/drizzle-client/schema'
import { eq, inArray, and } from 'drizzle-orm'

export const getArticles = async ({ categories: categoryNames }: { categories: string[] }) => {
  try {
    if (categoryNames.length === 0) {
      // Return all articles with author info
      const result = await db
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
      return result
    }

    // Get articles filtered by categories
    const result = await db
      .selectDistinct({
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
      .innerJoin(articlesToCategories, eq(articles.id, articlesToCategories.articleId))
      .innerJoin(categories, eq(articlesToCategories.categoryId, categories.id))
      .leftJoin(users, eq(articles.authorId, users.id))
      .where(inArray(categories.name, categoryNames))

    return result
  } catch {
    return null
  }
}

export const getArticleById = async ({ id }: { id: string }) => {
  try {
    const [article] = await db.select().from(articles).where(eq(articles.id, id))
    if (!article) return null

    // Get categories for this article
    const articleCategories = await db
      .select({
        id: categories.id,
        name: categories.name,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
      })
      .from(articlesToCategories)
      .innerJoin(categories, eq(articlesToCategories.categoryId, categories.id))
      .where(eq(articlesToCategories.articleId, id))

    // Get liked users for this article
    const likedUsers = await db
      .select({
        id: users.id,
      })
      .from(usersToLikedArticles)
      .innerJoin(users, eq(usersToLikedArticles.userId, users.id))
      .where(eq(usersToLikedArticles.articleId, id))

    return {
      ...article,
      categories: articleCategories,
      likedUsers,
    }
  } catch {
    return null
  }
}

export const createArticle = async ({
  data,
}: {
  data: typeof articles.$inferInsert & { 
    categories?: { connect?: { id: string }[] }
  }
}) => {
  try {
    const { categories: categoryData, ...articleData } = data
    const [article] = await db.insert(articles).values(articleData).returning()

    // Connect categories if provided
    if (categoryData?.connect && categoryData.connect.length > 0) {
      await db.insert(articlesToCategories).values(
        categoryData.connect.map((cat: { id: string }) => ({
          articleId: article.id,
          categoryId: cat.id,
        })),
      )
    }

    return article
  } catch {
    throw new Error('Failed to create article')
  }
}

export const deleteArticle = async ({ id }: { id: string }) => {
  try {
    const [article] = await db
      .delete(articles)
      .where(eq(articles.id, id))
      .returning()
    return article
  } catch {
    throw new Error('Failed to delete article')
  }
}

export const updateArticle = async ({
  id,
  data,
}: {
  id: string
  data: Partial<typeof articles.$inferInsert> & {
    categories?: { connect?: { id: string }[] }
  }
}) => {
  try {
    const { categories: categoryData, ...articleData } = data
    const [article] = await db
      .update(articles)
      .set({ ...articleData, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning()

    // Update categories if provided
    if (categoryData?.connect) {
      // Delete existing categories
      await db.delete(articlesToCategories).where(eq(articlesToCategories.articleId, id))
      
      // Add new categories
      if (categoryData.connect.length > 0) {
        await db.insert(articlesToCategories).values(
          categoryData.connect.map((cat: { id: string }) => ({
            articleId: id,
            categoryId: cat.id,
          })),
        )
      }
    }

    return article
  } catch {
    throw new Error('Failed to update article')
  }
}

// Contains AI-generated edits.
