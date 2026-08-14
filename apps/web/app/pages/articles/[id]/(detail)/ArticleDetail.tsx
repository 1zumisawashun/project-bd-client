import { FC } from 'react'
import { Article } from '../../shared/article.types'
import { AuthorArticleDetail } from './components/authorArticleDetail/AuthorArticleDetail'
import { DislikeButton } from './components/dislikeButton/DislikeButton'
import { LikeButton } from './components/likeButton/LikeButton'
import { UserArticleDetail } from './components/userArticleDetail/UserArticleDetail'

type ArticleDetailProps = {
  article: Article
  userId: string
}

export const ArticleDetail: FC<ArticleDetailProps> = ({ article, userId }) => {
  const isAuthor = article.authorId === userId
  const isLike =
    article.likedUsers.some(({ user }) => user.id === userId) ?? false

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
