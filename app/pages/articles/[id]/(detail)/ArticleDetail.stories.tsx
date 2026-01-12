import { type Meta, type StoryObj } from '@storybook/react'

import { FC } from 'react'
import {
  _MOCK_ARTICLE_DRAFT,
  _MOCK_ARTICLE_PUBLIC,
} from '../../shared/article.mocks'
import { ArticleDetail } from './ArticleDetail'

const meta: Meta<typeof ArticleDetail> = {
  title: 'feature/articles/ArticleDetail',
  component: ArticleDetail,
}

export default meta

type Story = StoryObj<typeof ArticleDetail>

const LikeRender: FC = () => {
  return <ArticleDetail article={_MOCK_ARTICLE_PUBLIC} userId="userId" />
}
const DislikeRender: FC = () => {
  return <ArticleDetail article={_MOCK_ARTICLE_PUBLIC} userId="userId" />
}
const DraftRender: FC = () => {
  return <ArticleDetail article={_MOCK_ARTICLE_DRAFT} userId="userId" />
}

export const Like: Story = {
  render: () => <LikeRender />,
}
export const Dislike: Story = {
  render: () => <DislikeRender />,
}
export const Draft: Story = {
  render: () => <DraftRender />,
}
