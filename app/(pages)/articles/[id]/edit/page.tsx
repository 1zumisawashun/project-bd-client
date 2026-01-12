import { NotFound } from '@/components/elements/NotFound'
import { getArticleById } from '@/functions/db/article'
import { getCategories } from '@/functions/db/category'
import { ArticleEdit } from '@/pages/articles/[id]/edit/ArticleEdit'

export default async function Page({ params }: { params: { id: string } }) {
  const categories = await getCategories()

  const article = await getArticleById({ id: params.id })

  if (!article) return <NotFound />

  return <ArticleEdit article={article} categories={categories} />
}
