import type { Meta, StoryObj } from '@storybook/react'

import { ArticleCreate } from './ArticleCreate'

const meta: Meta<typeof ArticleCreate> = {
  title: 'feature/ArticleCreate',
  component: ArticleCreate,
}
export default meta
type Story = StoryObj<typeof ArticleCreate>

export const Default: Story = {}
