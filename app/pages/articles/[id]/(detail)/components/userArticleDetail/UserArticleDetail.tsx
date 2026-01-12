'use client'

import { FC, ReactNode } from 'react'
import { ArticleDetailArticle } from '../../articleDetail.types'
import { BaseArticleDetail } from '../baseArticleDetail/BaseArticleDetail'

type UserArticleDetailProps = {
  article: ArticleDetailArticle
  likeButton: ReactNode
}

export const UserArticleDetail: FC<UserArticleDetailProps> = (props) => {
  return <BaseArticleDetail {...props} status={null} kebabMenu={null} />
}
