'use client'

import { FC, ReactNode } from 'react'
import { Article } from '../../../../shared/article.types'
import { BaseArticleDetail } from '../baseArticleDetail/BaseArticleDetail'

type UserArticleDetailProps = {
  article: Article
  likeButton: ReactNode
}

export const UserArticleDetail: FC<UserArticleDetailProps> = (props) => {
  return <BaseArticleDetail {...props} status={null} kebabMenu={null} />
}
