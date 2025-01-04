import { ArticleList } from '@/features/articles/ArticleList/ArticleList'
import { getArticles } from '@/functions/db/article'
import { getCategories } from '@/functions/db/category'
import { SearchParams } from '@/functions/types'
export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const categories = await getCategories()
  const categoryOptions = categories?.map((category) => category.name) ?? []

  const defaultValues = (() => {
    const params = searchParams['category']
    if (Array.isArray(params)) return params
    if (params) return [params]
    return []
  })()

  const articles = await getArticles({ categories: defaultValues })

  if (!articles) return <div>Failed to fetch articles</div>

  return (
    <ArticleList
      articles={articles}
      defaultValues={defaultValues}
      categoryOptions={categoryOptions}
    />
  )
}
