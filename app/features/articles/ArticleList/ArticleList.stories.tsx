import type { Meta, StoryObj } from '@storybook/react'

import { ArticleList } from './ArticleList'

const meta: Meta<typeof ArticleList> = {
  title: 'feature/ArticleList',
  component: ArticleList,
}
export default meta
type Story = StoryObj<typeof ArticleList>

export const Default: Story = {}
