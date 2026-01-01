import db from '@/functions/libs/drizzle-client/drizzle'
import {
  articles,
  articlesToCategories,
  categories,
  likedUsersToArticles,
  users,
} from '@/../../drizzle/schema'
import { eq, inArray, and } from 'drizzle-orm'

export const getArticles = async ({
  categories: categoryNames,
}: {
  categories: string[]
}) => {
  try {
    if (categoryNames.length === 0) {
      const articlesList = await db.query.articles.findMany({
        with: {
          author: {
            columns: {
              name: true,
            },
          },
        },
      })
      return articlesList
    }

    // Get category IDs for the given category names
    const categoryList = await db.query.categories.findMany({
      where: inArray(categories.name, categoryNames),
      columns: { id: true },
    })

    const categoryIds = categoryList.map((c) => c.id)

    if (categoryIds.length === 0) {
      return []
    }

    // Get articles that have these categories
    const articleIds = await db
      .selectDistinct({ articleId: articlesToCategories.articleId })
      .from(articlesToCategories)
      .where(inArray(articlesToCategories.categoryId, categoryIds))

    const articleIdList = articleIds.map((a) => a.articleId)

    if (articleIdList.length === 0) {
      return []
    }

    const articlesList = await db.query.articles.findMany({
      where: inArray(articles.id, articleIdList),
      with: {
        author: {
          columns: {
            name: true,
          },
        },
      },
    })

    return articlesList
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
    return article ?? null
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

    if (categoryData?.connect && article) {
      await db.insert(articlesToCategories).values(
        categoryData.connect.map((cat) => ({
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
    categories?: { set?: { id: string }[] }
  }
}) => {
  try {
    const { categories: categoryData, ...articleData } = data

    const [article] = await db
      .update(articles)
      .set(articleData)
      .where(eq(articles.id, id))
      .returning()

    if (categoryData?.set && article) {
      // Remove existing categories
      await db
        .delete(articlesToCategories)
        .where(eq(articlesToCategories.articleId, id))

      // Add new categories
      if (categoryData.set.length > 0) {
        await db.insert(articlesToCategories).values(
          categoryData.set.map((cat) => ({
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
