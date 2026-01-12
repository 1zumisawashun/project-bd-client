import { NotFound } from '@/components/elements/NotFound'
import { ArticleCard } from '@/features/articles/articleCard/ArticleCard'
import { ArticleCardGroup } from '@/features/articles/articleCardGroup/ArticleCardGroup'
import NextLink from 'next/link'
import { FC } from 'react'
import { MypageUser } from '../../myPage.types'

type MyPageArticleCardProps = {
  articles:
    | MypageUser['posts']
    | MypageUser['likedArticles'][number]['article'][]
}

export const MyPageArticleCard: FC<MyPageArticleCardProps> = ({ articles }) => {
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
