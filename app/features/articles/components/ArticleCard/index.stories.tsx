import type { Meta, StoryObj } from '@storybook/react'

import { ArticleCard, ArticleCardGroup } from './index'
import { articles } from '../../articles.constant'

const meta: Meta<typeof ArticleCard> = {
  title: 'feature/ArticleCard',
  component: ArticleCard,
  decorators: (Story) => (
    <div style={{ width: '576px' }}>
      <Story />
    </div>
  ),
}
export default meta
type Story = StoryObj<typeof ArticleCard>

const Render: React.FC = () => {
  return (
    <ArticleCardGroup>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </ArticleCardGroup>
  )
}
export const Default: Story = {
  render: () => <Render />,
}
