'use server'

import { articlesCategories } from '@/../drizzle/schema'
import {
  createArticle as _createArticle,
  getArticleById,
} from '@/functions/db/article'
import { createCategory, getCategoryByName } from '@/functions/db/category'
import { actionResult } from '@/functions/helpers/utils'
import db from '@/functions/libs/drizzle-client/drizzle'
import { auth } from '@/functions/libs/next-auth/auth'
import { Schema, schema } from '../../../shared/articleForm/articleForm.schema'

type CreateArticleArgs = { data: Schema }

export const createArticle = async (args: CreateArticleArgs) => {
  try {
    const session = await auth()

    if (!session?.user?.email) {
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

    const article = await _createArticle({
      data: {
        id: crypto.randomUUID(),
        title: data.title,
        content: data.content,
        status: data.status,
        authorId: session.user.id,
      },
    })

    if (!article) {
      return actionResult.end('記事の作成に失敗しました')
    }

    if (categoryIds.length > 0) {
      await db.insert(articlesCategories).values(
        categoryIds.map((categoryId) => ({
          articleId: article.id,
          categoryId,
        })),
      )
    }

    const fullArticle = await getArticleById({ id: article.id })
    if (!fullArticle) {
      return actionResult.end('記事の作成に失敗しました')
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
