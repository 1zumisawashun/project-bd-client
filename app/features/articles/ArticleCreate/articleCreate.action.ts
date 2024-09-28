'use server'

import { auth } from '@/functions/libs/next-auth/auth'
import { actionResult } from '@/functions/helpers/utils'
import { ActionsResult, Article } from '@/functions/types'
import { createArticle as _createArticle } from '@/functions/db/article'
import { createCategory, getCategoryByName } from '@/functions/db/category'
import { Schema, schema } from './articleCreate.schema'

type Return = ActionsResult<Omit<Article, 'likedUsers' | 'categories'>>
type Props = { data: Schema }
export const createArticle = async ({ data }: Props): Promise<Return> => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      actionResult.end('ログインしてください')
    }

    const validatedFields = schema.safeParse(data)

    if (!validatedFields.success) {
      actionResult.end(validatedFields.error.message)
    }

    const promises = data.categories.map(async ({ name }) => {
      const category = await getCategoryByName(name)
      if (!category) {
        const response = await createCategory(name)
        return { id: response.id }
      }
      return { id: category.id }
    })

    const categoryIds = await Promise.all(promises)

    const params = {
      ...data,
      author: { connect: { id: session!.user.id } },
      categories: { connect: categoryIds },
    }

    const response = await _createArticle(params)
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
