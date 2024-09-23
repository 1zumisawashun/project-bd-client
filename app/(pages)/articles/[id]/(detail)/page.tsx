import { ArticleDetail } from '@/features/articles/ArticleDetail/ArticleDetail'
import { getArticleById } from '@/functions/db/article'
import { NotFound } from '@/components/elements/NotFound'

export default async function Page({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id)

  if (!article) return <NotFound />

  return <ArticleDetail article={article} />
}
