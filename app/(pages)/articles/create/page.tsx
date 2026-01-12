import { getCategories } from '@/functions/db/category'
import { ArticleCreate } from '@/pages/articles/create/ArticleCreate'

export default async function Page() {
  const categories = await getCategories()

  return <ArticleCreate categories={categories} />
}
