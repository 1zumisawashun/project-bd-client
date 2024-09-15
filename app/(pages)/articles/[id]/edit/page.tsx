import { ArticleEdit } from '@/features/articles/ArticleEdit/ArticleEdit'
import { getArticleById } from '@/functions/db/article'

export default async function Page({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id)

  const defaultValues = {
    title: article?.title ?? '',
    content: article?.content ?? '',
  }

  return <ArticleEdit articleId={params.id} defaultValues={defaultValues} />
}
