import { redirect } from 'next/navigation'
import { getCategories } from '@/functions/db/category'
import { getSession } from '@/functions/libs/next-auth/session'
import { AdminCategoriesPage } from '@/pages/admin/categories/AdminCategoriesPage'

export default async function Page() {
  const session = await getSession()

  // 未認証ユーザーはログインページへリダイレクト
  if (!session?.user?.email) {
    redirect('/sign-in')
  }

  // 非管理者ユーザーはホームへリダイレクト
  if (session.user.role !== 'ADMIN') {
    redirect('/')
  }

  // カテゴリー一覧を取得
  const categories = await getCategories()

  return <AdminCategoriesPage categories={categories ?? []} />
}
