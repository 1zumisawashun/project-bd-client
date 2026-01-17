import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import { MOCK_ARTICLE_CATEGORIES } from '../shared/article.mocks'
import { ArticleCreate } from './ArticleCreate'

const meta: Meta<typeof ArticleCreate> = {
  title: 'feature/articles/ArticleCreate',
  component: ArticleCreate,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}

export default meta

type Story = StoryObj<typeof ArticleCreate>

const Render: FC = () => {
  return <ArticleCreate categories={MOCK_ARTICLE_CATEGORIES} />
}

export const Default: Story = {
  render: () => <Render />,
}
