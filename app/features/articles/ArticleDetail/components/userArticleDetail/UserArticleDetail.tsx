'use client'

import { Article } from '@/functions/types'
import { FC, ReactNode } from 'react'
import { BaseArticleDetail } from '../baseArticleDetail/BaseArticleDetail'

type Props = {
  article: Article
  likeButton: ReactNode
}
export const UserArticleDetail: FC<Props> = (props) => {
  return <BaseArticleDetail {...props} status={null} kebabMenu={null} />
}
