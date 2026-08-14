import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'
import {
  _MOCK_ARTICLE_PUBLIC,
  MOCK_ARTICLE_CATEGORIES,
} from '../../shared/article.mocks'
import { ArticleEdit } from './ArticleEdit'

const meta: Meta<typeof ArticleEdit> = {
  title: 'feature/articles/ArticleEdit',
  component: ArticleEdit,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}

export default meta

type Story = StoryObj<typeof ArticleEdit>

const Render: FC = () => {
  return (
    <ArticleEdit
      article={_MOCK_ARTICLE_PUBLIC}
      categories={MOCK_ARTICLE_CATEGORIES}
    />
  )
}
export const Default: Story = {
  render: () => <Render />,
}
