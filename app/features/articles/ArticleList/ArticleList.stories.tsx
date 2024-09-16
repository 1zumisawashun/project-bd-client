import type { Meta, StoryObj } from '@storybook/react'

import { mockUsers } from '@/functions/constants/users'
import { ArticleList } from './ArticleList'

const meta: Meta<typeof ArticleList> = {
  title: 'feature/articles/ArticleList',
  component: ArticleList,
}
export default meta
type Story = StoryObj<typeof ArticleList>

const Render: React.FC = () => {
  return <ArticleList articles={mockUsers[0]?.posts ?? []} />
}
export const Default: Story = {
  render: () => <Render />,
}
