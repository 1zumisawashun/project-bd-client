import type { Meta, StoryObj } from '@storybook/react'

import { mockArticle } from '@/functions/constants/articles'
import { LikeButton } from '../likeButton/LikeButton'
import { AuthorArticleDetail } from './AuthorArticleDetail'

const meta: Meta<typeof AuthorArticleDetail> = {
  title: 'feature/articles/AuthorArticleDetail',
  component: AuthorArticleDetail,
}
export default meta
type Story = StoryObj<typeof AuthorArticleDetail>

const Render: React.FC = () => {
  return (
    <AuthorArticleDetail
      article={mockArticle}
      likeButton={<LikeButton articleId={mockArticle.id} userId="" />}
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}
