import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { _MOCK_ARTICLE_PUBLIC } from '../../../../shared/article.mocks'
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
      article={_MOCK_ARTICLE_PUBLIC}
      likeButton={
        <LikeButton articleId={_MOCK_ARTICLE_PUBLIC.id} userId="userId" />
      }
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}
