import { NotFound } from '@/components/elements/NotFound'
import { getArticles } from '@/functions/db/article'
import { getCategories } from '@/functions/db/category'
import { SearchParams } from '@/functions/types'
import { ArticleList } from '@/pages/articles/(list)/ArticleList'

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const categories = await getCategories()

  // NOTE: 計算結果を CC でも利用するため I/F に定義する
  const defaultValues = (() => {
    const params = searchParams['category']
    if (Array.isArray(params)) return params
    if (params) return [params]
    return []
  })()

  const articles = await getArticles({ categories: defaultValues })

  if (!articles) return <NotFound />

  return (
    <ArticleList
      articles={articles}
      defaultValues={defaultValues}
      categories={categories}
    />
  )
}
