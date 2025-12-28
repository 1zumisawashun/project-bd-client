import { content } from '@/functions/constants/content'
import { getCategories } from '@/functions/db/category'
import { ArticleCreate } from '@/pages/articles/create/ArticleCreate'

export default async function Page() {
  const categories = await getCategories()

  const categoryOptions = categories?.map((category) => category.name) ?? []

  const defaultValues = {
    title: '',
    content,
    categories: [],
    status: 'PUBLISHED' as const,
  }

  return (
    <ArticleCreate
      defaultValues={defaultValues}
      categoryOptions={categoryOptions}
    />
  )
}
