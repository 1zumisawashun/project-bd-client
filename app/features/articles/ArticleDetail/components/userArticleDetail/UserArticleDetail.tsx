'use client'

import { Article } from '@/functions/types'
import { BaseArticleDetail } from '../baseArticleDetail/BaseArticleDetail'

type Props = {
  article: Article
  likeButton: React.ReactNode
}
export const UserArticleDetail: React.FC<Props> = (props) => {
  return <BaseArticleDetail {...props} status={null} kebabMenu={null} />
}
