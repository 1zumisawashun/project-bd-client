import { ArticleEdit } from '@/features/articles/ArticleEdit/ArticleEdit'
import prisma from '@/functions/libs/prisma-client/prisma'

export default async function Page({ params }: { params: { id: string } }) {
  const articleId = params.id

  const article = await prisma.article.findUnique({
    where: { id: articleId },
  })

  const defaultValues = {
    title: article?.title ?? '',
    content: article?.content ?? '',
  }

  return <ArticleEdit articleId={articleId} defaultValues={defaultValues} />
}
