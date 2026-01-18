import { NotFound } from '@/components/elements/NotFound'
import { getArticleById } from '@/functions/db/article'
import { getSession } from '@/functions/libs/next-auth/session'
import { ArticleDetail } from '@/pages/articles/[id]/(detail)/ArticleDetail'

export default async function Page({ params }: { params: { id: string } }) {
  const article = await getArticleById({ id: params.id })

  // NOTE: session は必要な情報のみ I/F に定義する
  const session = await getSession()

  if (!article || !session?.user.id) return <NotFound />

  return <ArticleDetail article={article} userId={session.user.id} />
}
