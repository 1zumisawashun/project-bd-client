import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { _MOCK_ARTICLE_PUBLIC } from '../../../../shared/article.mocks'
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
