import type { Meta, StoryObj } from '@storybook/react'

import { mockArticles } from '@/functions/constants/articles'
import { ArticleList } from './ArticleList'

const meta: Meta<typeof ArticleList> = {
  title: 'feature/articles/ArticleList',
  component: ArticleList,
}
export default meta
type Story = StoryObj<typeof ArticleList>

const Render: React.FC = () => {
  return <ArticleList articles={mockArticles} />
}
export const Default: Story = {
  render: () => <Render />,
}
