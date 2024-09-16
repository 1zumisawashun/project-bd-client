import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'

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
  return <ArticleCreate />
}
export const Default: Story = {
  render: () => <Render />,
}
