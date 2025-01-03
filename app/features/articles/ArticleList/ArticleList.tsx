import { Articles } from '@/functions/types'
import NextLink from 'next/link'
import { ArticleCard } from '../components/articleCard/ArticleCard'
import { ArticleCardGroup } from '../components/articleCardGroup/ArticleCardGroup'

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
