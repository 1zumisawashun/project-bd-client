import { ArticleCreate } from '@/features/articles/ArticleCreate/ArticleCreate'
import { getCategories } from '@/functions/db/category'
import { content } from '@/functions/constants/content'

export default async function Page() {
  const categories = await getCategories()

  const categoryOptions = categories?.map((category) => category.name) ?? []

  const defaultValues = {
    title: '',
    content,
    categories: [],
  }

  return (
    <ArticleCreate
      defaultValues={defaultValues}
      categoryOptions={categoryOptions}
    />
  )
}
