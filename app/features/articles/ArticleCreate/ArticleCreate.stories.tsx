import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { content } from '@/functions/constants/content'

import { ArticleCreate } from './ArticleCreate'

const meta: Meta<typeof ArticleCreate> = {
  title: 'feature/articles/ArticleCreate',
  component: ArticleCreate,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof ArticleCreate>

const Render: React.FC = () => {
  return (
    <ArticleCreate
      defaultValues={{
        title: '',
        content,
        categories: [],
        status: 'PUBLISHED',
      }}
      categoryOptions={['JavaScript', 'TypeScript', 'React']}
    />
  )
}
export const Default: Story = {
  render: () => <Render />,
}
