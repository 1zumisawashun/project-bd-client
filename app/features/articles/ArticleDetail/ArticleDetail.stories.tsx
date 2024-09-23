import type { Meta, StoryObj } from '@storybook/react'

import { mockArticles } from '@/functions/constants/articles'
import { ArticleDetail } from './ArticleDetail'

const meta: Meta<typeof ArticleDetail> = {
  title: 'feature/articles/ArticleDetail',
  component: ArticleDetail,
}
export default meta
type Story = StoryObj<typeof ArticleDetail>

const IsUserRender: React.FC = () => {
  return <ArticleDetail article={mockArticles.at(1)!} isAuthor={false} />
}
const IsAuthorPublishRender: React.FC = () => {
  return <ArticleDetail article={mockArticles.at(1)!} isAuthor />
}
const IsAuthorDraftRender: React.FC = () => {
  return <ArticleDetail article={mockArticles.at(-1)!} isAuthor />
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
