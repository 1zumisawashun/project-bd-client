import type { Meta, StoryObj } from '@storybook/react'

import {
  mockArticle,
  mockArticlePublish,
  mockArticleDraft,
} from '@/functions/constants/articles'
import { ArticleDetail } from './ArticleDetail'

const meta: Meta<typeof ArticleDetail> = {
  title: 'feature/articles/ArticleDetail',
  component: ArticleDetail,
}
export default meta
type Story = StoryObj<typeof ArticleDetail>

const IsUserRender: React.FC = () => {
  return (
    <ArticleDetail
      article={mockArticle}
      isAuthor={false}
      userId=""
      isLike={false}
    />
  )
}
const IsAuthorPublishRender: React.FC = () => {
  return (
    <ArticleDetail
      article={mockArticlePublish}
      isAuthor
      userId=""
      isLike={false}
    />
  )
}
const IsAuthorDraftRender: React.FC = () => {
  return (
    <ArticleDetail
      article={mockArticleDraft}
      isAuthor
      userId=""
      isLike={false}
    />
  )
}
export const IsUser: Story = {
  render: () => <IsUserRender />,
}
export const IsAuthorPublish: Story = {
  render: () => <IsAuthorPublishRender />,
}
export const IsAuthorDraft: Story = {
  render: () => <IsAuthorDraftRender />,
}
