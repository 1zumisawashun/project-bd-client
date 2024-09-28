'use server'

import { auth } from '@/functions/libs/next-auth/auth'
import { actionResult } from '@/functions/helpers/utils'
import { ActionsResult, Article } from '@/functions/types'
import { updateArticle } from '@/functions/db/article'
import { createCategory, getCategoryByName } from '@/functions/db/category'
import { Schema, schema } from './articleEdit.schema'

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

    const promises = data.categories.map(async ({ name }) => {
      const category = await getCategoryByName({ name })
      if (!category) {
        const response = await createCategory({ name })
        return { id: response.id }
      }
      return { id: category.id }
    })

    const categoryIds = await Promise.all(promises)

    const params = {
      ...data,
      author: { connect: { id: session.user.id } },
      categories: { connect: categoryIds },
    }

    const response = await updateArticle({ id, data: params })
    return actionResult.success(response)
  } catch (error) {
    return actionResult.error(error)
  }
}
