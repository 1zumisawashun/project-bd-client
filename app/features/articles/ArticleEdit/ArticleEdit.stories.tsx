import type { Meta, StoryObj } from '@storybook/react'

import { ArticleEditForm } from './ArticleEdit'

const meta: Meta<typeof ArticleEditForm> = {
  title: 'feature/articles/ArticleEdit',
  component: ArticleEditForm,
}
export default meta
type Story = StoryObj<typeof ArticleEditForm>

const Render: React.FC = () => {
  return <ArticleEditForm />
}
export const Default: Story = {
  render: () => <Render />,
}
