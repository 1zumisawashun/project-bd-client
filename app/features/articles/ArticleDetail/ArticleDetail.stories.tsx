import type { Meta, StoryObj } from '@storybook/react'

import { mockArticles } from '@/functions/constants/articles'
import { ArticleDetail } from './ArticleDetail'

const meta: Meta<typeof ArticleDetail> = {
  title: 'feature/articles/ArticleDetail',
  component: ArticleDetail,
}
export default meta
type Story = StoryObj<typeof ArticleDetail>

const Render: React.FC = () => {
  return <ArticleDetail article={mockArticles[0]!} />
}
export const Default: Story = {
  render: () => <Render />,
}
