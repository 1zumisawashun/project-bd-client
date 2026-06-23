'use server'

import { revalidatePath } from 'next/cache'
import { getCategoryByName, createCategory } from '@/functions/db/category'
import { actionResult, ActionsResult } from '@/functions/helpers/actionResult'
import { getSession } from '@/functions/libs/next-auth/session'

type CategoryFormValues = {
  name: string
}

type CreateCategoryResult = {
  id: string
  name: string
}

export async function createCategoryAction(
  values: CategoryFormValues,
): Promise<ActionsResult<CreateCategoryResult>> {
  try {
    // 1. 認証確認
    const session = await getSession()
    if (!session?.user?.email) {
      return actionResult.error(new Error('ログインしてください'))
    }

    // 2. 管理者権限確認
    if (session.user.role !== 'ADMIN') {
      return actionResult.error(new Error('管理者権限が必要です'))
    }

    // 3. 重複チェック
    const existingCategory = await getCategoryByName({ name: values.name })
    if (existingCategory) {
      return actionResult.error(new Error('このカテゴリー名は既に存在します'))
    }

    // 4. カテゴリー作成
    const category = await createCategory({ name: values.name })
    if (!category) {
      return actionResult.error(new Error('カテゴリーの作成に失敗しました'))
    }

    // 5. キャッシュ無効化
    revalidatePath('/admin/categories')

    // 6. 成功レスポンス
    return actionResult.success({
      id: category.id,
      name: category.name,
    })
  } catch (error) {
    return actionResult.error(error)
  }
}
