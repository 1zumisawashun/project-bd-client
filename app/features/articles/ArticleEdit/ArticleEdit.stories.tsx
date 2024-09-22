import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { content } from '@/functions/constants/content'

import { ArticleEdit } from './ArticleEdit'

const meta: Meta<typeof ArticleEdit> = {
  title: 'feature/articles/ArticleEdit',
  component: ArticleEdit,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof ArticleEdit>

const Render: React.FC = () => {
  return (
    <ArticleEdit
      articleId="1"
      defaultValues={{
        title: 'テスト',
        content,
        categories: [{ name: 'JavaScript' }],
      }}
      categoryOptions={['JavaScript', 'TypeScript', 'React']}
    />
  )
}
export const Default: Story = {
  render: () => <Render />,
}
