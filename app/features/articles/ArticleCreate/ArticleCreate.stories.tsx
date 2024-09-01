import type { Meta, StoryObj } from '@storybook/react'

import { ArticleCreate } from './ArticleCreate'

const meta: Meta<typeof ArticleCreate> = {
  title: 'feature/articles/ArticleCreate',
  component: ArticleCreate,
}
export default meta
type Story = StoryObj<typeof ArticleCreate>

const Render: React.FC = () => {
  return <ArticleCreate />
}
export const Default: Story = {
  render: () => <Render />,
}
