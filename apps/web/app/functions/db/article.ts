import { eq } from 'drizzle-orm'
import db from '@/functions/libs/drizzle/client'
import { articles, type InsertArticle } from '@/functions/libs/drizzle/schema'

export const getArticles = async ({ categories }: { categories: string[] }) => {
  try {
    if (categories.length === 0) {
      const allArticles = await db.query.articles.findMany({
        with: {
          author: true,
        },
      })
      return allArticles ?? null
    }

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

    const filtered = articlesList.filter((article) =>
      article.categories.some(({ category }) =>
        categories.includes(category.name),
      ),
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

    return article ?? null
  } catch {
    return null
  }
}

export const createArticle = async ({ data }: { data: InsertArticle }) => {
  try {
    const article = await db.insert(articles).values(data).returning()
    return article[0] ?? null
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
    return article ?? null
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
    const [article] = await db
      .update(articles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(articles.id, id))
      .returning()
    return article ?? null
  } catch {
    throw new Error('Failed to update article')
  }
}
