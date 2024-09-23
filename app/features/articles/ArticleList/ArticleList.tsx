import NextLink from 'next/link'
import { Articles } from '@/functions/types'
import { ArticleCard } from '../components/ArticleCard'
import { ArticleCardGroup } from '../components/ArticleCardGroup'

type Props = {
  articles: Articles
}
export const ArticleList: React.FC<Props> = ({ articles }) => {
  return (
    <ArticleCardGroup>
      {articles.map((article) => (
        <NextLink href={`/articles/${article.id}`} key={article.id}>
          <ArticleCard article={article} />
        </NextLink>
      ))}
    </ArticleCardGroup>
  )
}
