import type { Meta, StoryObj } from '@storybook/react'

import { mockArticle } from '@/functions/constants/articles'
import { FC } from 'react'
import { LikeButton } from '../likeButton/LikeButton'
import { UserArticleDetail } from './UserArticleDetail'

const meta: Meta<typeof UserArticleDetail> = {
  title: 'feature/articles/UserArticleDetail',
  component: UserArticleDetail,
}
export default meta
type Story = StoryObj<typeof UserArticleDetail>

const Render: FC = () => {
  return (
    <UserArticleDetail
      article={mockArticle}
      likeButton={<LikeButton articleId={mockArticle.id} userId="" />}
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}
