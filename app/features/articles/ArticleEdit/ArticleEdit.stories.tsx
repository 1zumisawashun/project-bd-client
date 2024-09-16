import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { content } from '@/components/elements/Editor/index.constant'

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
    <ArticleEdit articleId="1" defaultValues={{ title: 'テスト', content }} />
  )
}
export const Default: Story = {
  render: () => <Render />,
}
