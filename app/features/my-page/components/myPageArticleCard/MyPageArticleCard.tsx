import { NotFound } from '@/components/elements/NotFound'
import { ArticleCard } from '@/features/articles/components/articleCard/ArticleCard'
import { ArticleCardGroup } from '@/features/articles/components/articleCardGroup/ArticleCardGroup'
import { User } from '@/functions/types'
import NextLink from 'next/link'
import { FC } from 'react'

type Props = {
  articles: User['posts']
}
export const MyPageArticleCard: FC<Props> = ({ articles }) => {
  if (articles.length === 0) {
    return <NotFound />
  }

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
