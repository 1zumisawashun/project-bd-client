import { type Meta, type StoryObj } from '@storybook/react'

import { FC } from 'react'
import { ArticleDetail } from './ArticleDetail'
import {
  MOCK_ARTICLE_DETAIL_DRAFT_ARTICLE,
  MOCK_ARTICLE_DETAIL_PUBLIC_ARTICLE,
} from './articleDetail.mocks'

const meta: Meta<typeof ArticleDetail> = {
  title: 'feature/articles/ArticleDetail',
  component: ArticleDetail,
}

export default meta

type Story = StoryObj<typeof ArticleDetail>

const LikeRender: FC = () => {
  return (
    <ArticleDetail
      article={MOCK_ARTICLE_DETAIL_PUBLIC_ARTICLE}
      isAuthor
      userId="userId"
      isLike
    />
  )
}
const DislikeRender: FC = () => {
  return (
    <ArticleDetail
      article={MOCK_ARTICLE_DETAIL_PUBLIC_ARTICLE}
      isAuthor
      userId="userId"
      isLike={false}
    />
  )
}
const DraftRender: FC = () => {
  return (
    <ArticleDetail
      article={MOCK_ARTICLE_DETAIL_DRAFT_ARTICLE}
      isAuthor
      userId="userId"
      isLike
    />
  )
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
