import { ArticleDetail } from '@/features/articles/ArticleDetail/ArticleDetail'
import { getArticleById } from '@/functions/db/article'

export default async function Page({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id)

  if (!article) return <div>記事が見つかりませんでした</div>

  return <ArticleDetail article={article} />
}
