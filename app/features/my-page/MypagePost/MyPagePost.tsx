import { ArticleCard } from '@/features/articles/components/ArticleCard'
import { ArticleCardGroup } from '@/features/articles/components/ArticleCardGroup'
import NextLink from 'next/link'
import { User } from '@/functions/types'

type Props = {
  articles: User['posts']
}
export const MyPagePost: React.FC<Props> = ({ articles }) => {
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
