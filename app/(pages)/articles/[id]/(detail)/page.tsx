import { ArticleDetail } from '@/features/articles/ArticleDetail/ArticleDetail'
import prisma from '@/functions/libs/prisma-client/prisma'

export default async function Page({ params }: { params: { id: string } }) {
  const articleId = params.id

  const article = await prisma.article.findUnique({
    where: { id: articleId },
  })

  if (!article) return <div>記事が見つかりませんでした</div>

  return <ArticleDetail article={article} />
}
