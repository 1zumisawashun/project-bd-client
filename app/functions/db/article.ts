import db from '@/functions/libs/drizzle-client/drizzle'
import { articles, articlesCategories, likedArticles } from '@/../drizzle/schema'
import { eq, inArray } from 'drizzle-orm'
import type { InsertArticle } from '@/../drizzle/schema'

export const getArticles = async ({ categories }: { categories: string[] }) => {
  try {
    if (categories.length === 0) {
      const allArticles = await db.query.articles.findMany({
        with: {
          author: true,
        },
      })
      return allArticles
    }

    // Query articles with category filtering
    const articlesList = await db.query.articles.findMany({
      with: {
        author: true,
        categories: {
          with: {
            category: true,
          },
        },
      },
    })

    // Filter articles that have at least one matching category
    const filtered = articlesList.filter((article) =>
      article.categories.some((ac) => categories.includes(ac.category.name)),
    )

    return filtered
  } catch {
    return null
  }
}

export const getArticleById = async ({ id }: { id: string }) => {
  try {
    const article = await db.query.articles.findFirst({
      where: eq(articles.id, id),
      with: {
        categories: {
          with: {
            category: true,
          },
        },
        likedUsers: {
          columns: {},
          with: {
            user: {
              columns: {
                id: true,
              },
            },
          },
        },
      },
    })
    return article || null
  } catch {
    return null
  }
}

export const createArticle = async ({
  data,
}: {
  data: InsertArticle
}) => {
  try {
    const article = await db.insert(articles).values(data).returning()
    return article[0]
  } catch {
    throw new Error('Failed to create article')
  }
}

export const deleteArticle = async ({ id }: { id: string }) => {
  try {
    const article = await db.delete(articles).where(eq(articles.id, id)).returning()
    return article[0]
  } catch {
    throw new Error('Failed to delete article')
  }
}

export const updateArticle = async ({
  id,
  data,
}: {
  id: string
  data: Partial<InsertArticle>
}) => {
  try {
    const article = await db
      .update(articles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning()
    return article[0]
  } catch {
    throw new Error('Failed to update article')
  }
}
// Contains AI-generated edits.
