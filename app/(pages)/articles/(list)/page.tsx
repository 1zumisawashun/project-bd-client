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
  const categoryOptions = categories?.map((category) => category.name) ?? []
  console.log('categoryOptions', categoryOptions)

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
