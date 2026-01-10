'use server'

import { updateArticle, getArticleById } from '@/functions/db/article'
import { createCategory, getCategoryByName } from '@/functions/db/category'
import db from '@/functions/libs/drizzle-client/drizzle'
import { articlesCategories } from '@/../drizzle/schema'
import { eq } from 'drizzle-orm'
import { actionResult } from '@/functions/helpers/utils'
import { auth } from '@/functions/libs/next-auth/auth'
import { ActionsResult, Article } from '@/functions/types'
import {
  Schema,
  schema,
} from '../../../../shared/articleForm/articleForm.schema'

type Return = ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>
type Props = { data: Schema; id: string }

export const editArticle = async ({ data, id }: Props): Promise<Return> => {
  try {
    const session = await auth()

    if (!session?.user.id) {
      return actionResult.end('ログインしてください')
    }

    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
      return actionResult.end(validatedFields.error.message)
    }

    // Get or create categories
    const promises = data.categories.map(async ({ name }) => {
      const category = await getCategoryByName({ name })
      if (!category) {
        const response = await createCategory({ name })
        return response.id
      }
      return category.id
    })

    const categoryIds = await Promise.all(promises)

    // Update article
    await updateArticle({
      id,
      data: {
        title: data.title,
        content: data.content,
        status: data.status,
      },
    })

    // Update categories: delete existing and insert new ones
    await db.delete(articlesCategories).where(eq(articlesCategories.articleId, id))
    
    if (categoryIds.length > 0) {
      await db.insert(articlesCategories).values(
        categoryIds.map((categoryId) => ({
          articleId: id,
          categoryId,
        }))
      )
    }

    const fullArticle = await getArticleById({ id })
    if (!fullArticle) {
      return actionResult.end('記事の更新に失敗しました')
    }

    const { likedUsers, categories, ...articleData } = fullArticle
    return actionResult.success(articleData)
  } catch (error) {
    return actionResult.error(error)
  }
}
// Contains AI-generated edits.
