import { ArticleEdit } from '@/features/articles/ArticleEdit/ArticleEdit'
import { getArticleById } from '@/functions/db/article'
import { getCategories } from '@/functions/db/category'

export default async function Page({ params }: { params: { id: string } }) {
  const categories = await getCategories()

  const categoryOptions = categories?.map((category) => category.name) ?? []

  const article = await getArticleById(params.id)

  const defaultValues = {
    title: article?.title ?? '',
    content: article?.content ?? '',
    categories: article?.categories?.map((category) => ({ name: category.name })) ?? [],
  }

  return (
    <ArticleEdit
      articleId={params.id}
      defaultValues={defaultValues}
      categoryOptions={categoryOptions}
    />
  )
}
