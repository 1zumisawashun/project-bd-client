import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { MOCK_ARTICLE_CATEGORIES } from '../shared/article.mocks'
import { ArticleList } from './ArticleList'
import { MOCK_ARTICLE_LIST_ARTICLE } from './articleList.mocks'

const meta: Meta<typeof ArticleList> = {
  title: 'feature/articles/ArticleList',
  component: ArticleList,
}

export default meta

type Story = StoryObj<typeof ArticleList>

const Render: FC = () => {
  return (
    <ArticleList
      articles={MOCK_ARTICLE_LIST_ARTICLE}
      categories={MOCK_ARTICLE_CATEGORIES}
      defaultValues={[]}
    />
  )
}
export const Default: Story = {
  render: () => <Render />,
}
