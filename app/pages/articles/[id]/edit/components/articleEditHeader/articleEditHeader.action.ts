'use server'

import { eq } from 'drizzle-orm'
import { getArticleById, updateArticle } from '@/functions/db/article'
import { createCategory, getCategoryByName } from '@/functions/db/category'
import { actionResult } from '@/functions/helpers/utils'
import db from '@/functions/libs/drizzle/client'
import { articlesCategories } from '@/functions/libs/drizzle/schema'
import { auth } from '@/functions/libs/next-auth/auth'
import {
  Schema,
  schema,
} from '../../../../shared/articleForm/articleForm.schema'

type EditArticleArgs = {
  data: Schema
  id: string
}

export const editArticle = async (args: EditArticleArgs) => {
  try {
    const session = await auth()

    if (!session?.user.email) {
      return actionResult.end('ログインしてください')
    }

    const validatedFields = schema.safeParse(args.data)
    const { success, error, data } = validatedFields

    if (!success) {
      return actionResult.end(error.message)
    }

    const promises = data.categories.map(async ({ name }) => {
      const category = await getCategoryByName({ name })
      if (!category) {
        const response = await createCategory({ name })
        return response?.id ?? ''
      }
      return category.id
    })

    // 空文字排除のためfilter(Boolean)を追加
    const categoryIds = (await Promise.all(promises)).filter(Boolean)

    await updateArticle({
      id: args.id,
      data: {
        title: data.title,
        content: data.content,
        status: data.status,
      },
    })

    await db
      .delete(articlesCategories)
      .where(eq(articlesCategories.articleId, args.id))

    if (categoryIds.length > 0) {
      await db.insert(articlesCategories).values(
        categoryIds.map((categoryId) => ({
          articleId: args.id,
          categoryId,
        })),
      )
    }

    const fullArticle = await getArticleById({ id: args.id })
    if (!fullArticle) {
      return actionResult.end('記事の更新に失敗しました')
    }

    const {
      likedUsers: _likedUsers,
      categories: _categories,
      ...articleData
    } = fullArticle
    return actionResult.success(articleData)
  } catch (error) {
    return actionResult.error(error)
  }
}
