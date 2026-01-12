import { FC } from 'react'
import { ArticleDetailArticle } from './articleDetail.types'
import { AuthorArticleDetail } from './components/authorArticleDetail/AuthorArticleDetail'
import { DislikeButton } from './components/dislikeButton/DislikeButton'
import { LikeButton } from './components/likeButton/LikeButton'
import { UserArticleDetail } from './components/userArticleDetail/UserArticleDetail'

type ArticleDetailProps = {
  article: ArticleDetailArticle
  isAuthor: boolean
  userId: string
  isLike: boolean
}

export const ArticleDetail: FC<ArticleDetailProps> = ({
  isAuthor,
  isLike,
  article,
  userId,
}) => {
  const likeButton = isLike ? (
    <LikeButton articleId={article.id} userId={userId} />
  ) : (
    <DislikeButton articleId={article.id} userId={userId} />
  )

  return isAuthor ? (
    <AuthorArticleDetail article={article} likeButton={likeButton} />
  ) : (
    <UserArticleDetail article={article} likeButton={likeButton} />
  )
}
