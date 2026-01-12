import { type Meta, type StoryObj } from '@storybook/react'

import { FC } from 'react'
import { MOCK_ARTICLE_DETAIL_PUBLIC_ARTICLE } from '../../articleDetail.mocks'
import { LikeButton } from '../likeButton/LikeButton'
import { UserArticleDetail } from './UserArticleDetail'

const meta: Meta<typeof UserArticleDetail> = {
  title: 'feature/articles/UserArticleDetail',
  component: UserArticleDetail,
}

export default meta

type Story = StoryObj<typeof UserArticleDetail>

const Render: FC = () => {
  return (
    <UserArticleDetail
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
