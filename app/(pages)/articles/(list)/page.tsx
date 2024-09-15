import { ArticleList } from '@/features/articles/ArticleList/ArticleList'
import { getArticles } from '@/functions/db/article'

export default async function Page() {
  const articles = await getArticles()

  if (!articles) return <div>Failed to fetch articles</div>

  return <ArticleList articles={articles} />
}
