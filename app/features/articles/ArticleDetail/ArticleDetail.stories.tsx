import type { Meta, StoryObj } from '@storybook/react'

import { mockArticle, mockArticleDraft } from '@/functions/constants/articles'
import { ArticleDetail } from './ArticleDetail'

const meta: Meta<typeof ArticleDetail> = {
  title: 'feature/articles/ArticleDetail',
  component: ArticleDetail,
}
export default meta
type Story = StoryObj<typeof ArticleDetail>

const LikeRender: React.FC = () => {
  return <ArticleDetail article={mockArticle} isAuthor userId="" isLike />
}
const DislikeRender: React.FC = () => {
  return (
    <ArticleDetail article={mockArticle} isAuthor userId="" isLike={false} />
  )
}
const DraftRender: React.FC = () => {
  return <ArticleDetail article={mockArticleDraft} isAuthor userId="" isLike />
}

export const Like: Story = {
  render: () => <LikeRender />,
}
export const Dislike: Story = {
  render: () => <DislikeRender />,
}
export const Draft: Story = {
  render: () => <DraftRender />,
}
