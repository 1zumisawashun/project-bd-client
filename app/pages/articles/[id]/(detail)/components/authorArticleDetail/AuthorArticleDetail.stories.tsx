import { type Meta, type StoryObj } from '@storybook/react'

import { FC } from 'react'
import { MOCK_ARTICLE_DETAIL_PUBLIC_ARTICLE } from '../../articleDetail.mocks'
import { LikeButton } from '../likeButton/LikeButton'
import { AuthorArticleDetail } from './AuthorArticleDetail'

const meta: Meta<typeof AuthorArticleDetail> = {
  title: 'feature/articles/AuthorArticleDetail',
  component: AuthorArticleDetail,
}

export default meta

type Story = StoryObj<typeof AuthorArticleDetail>

const Render: FC = () => {
  return (
    <AuthorArticleDetail
      article={MOCK_ARTICLE_DETAIL_PUBLIC_ARTICLE}
      likeButton={
        <LikeButton
          articleId={MOCK_ARTICLE_DETAIL_PUBLIC_ARTICLE.id}
          userId=""
        />
      }
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}
