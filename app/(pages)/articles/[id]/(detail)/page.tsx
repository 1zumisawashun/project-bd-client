import { NotFound } from '@/components/elements/NotFound'
import { getArticleById } from '@/functions/db/article'
import { auth } from '@/functions/libs/next-auth/auth'
import { ArticleDetail } from '@/pages/articles/[id]/ArticleDetail'

export default async function Page({ params }: { params: { id: string } }) {
  const article = await getArticleById({ id: params.id })
  const session = await auth()

  const userId = session?.user?.id ?? ''
  const isAuthor = article?.authorId === userId
  const isLike = article?.likedUsers.some((d) => d.id === userId) ?? false

  if (!article) return <NotFound />

  return (
    <ArticleDetail
      article={article}
      isAuthor={isAuthor}
      userId={userId}
      isLike={isLike}
    />
  )
}
