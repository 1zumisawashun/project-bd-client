'use client'

import { useRouter } from 'next/navigation'
import { CategoryForm } from './components/CategoryForm'
import { CategoryList } from './components/CategoryList'

type Category = {
  id: string
  name: string
  createdAt: Date
}

type AdminCategoriesPageProps = {
  categories: Category[]
}

export function AdminCategoriesPage({ categories }: AdminCategoriesPageProps) {
  const router = useRouter()

  const handleSuccess = () => {
    router.refresh()
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">カテゴリー管理</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">カテゴリーを追加</h2>
        <CategoryForm onSuccess={handleSuccess} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">カテゴリー一覧</h2>
        <CategoryList categories={categories} />
      </section>
    </div>
  )
}
