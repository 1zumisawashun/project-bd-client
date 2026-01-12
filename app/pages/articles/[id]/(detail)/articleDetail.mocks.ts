import {
  MOCK_ARTICLE_DRAFT,
  MOCK_ARTICLE_PUBLISH,
} from '@/drizzle/constants/articles'
import { MOCK_CATEGORIES } from '@/drizzle/constants/categories'
import { MOCK_USERS } from '@/drizzle/constants/users'
import { ArticleDetailArticle } from './articleDetail.types'

export const MOCK_ARTICLE_DETAIL_PUBLIC_ARTICLE = {
  ...MOCK_ARTICLE_PUBLISH,
  categories: MOCK_CATEGORIES.map((category) => ({
    categoryId: 'categoryId',
    articleId: 'articleId',
    category,
  })),
  likedUsers: MOCK_USERS.map((user) => ({
    userId: 'userId',
    articleId: 'articleId',
    user: {
      id: user.id,
    },
  })),
} satisfies ArticleDetailArticle

export const MOCK_ARTICLE_DETAIL_DRAFT_ARTICLE = {
  ...MOCK_ARTICLE_DRAFT,
  categories: MOCK_CATEGORIES.map((category) => ({
    categoryId: 'categoryId',
    articleId: 'articleId',
    category,
  })),
  likedUsers: MOCK_USERS.map((user) => ({
    userId: 'userId',
    articleId: 'articleId',
    user: {
      id: user.id,
    },
  })),
} satisfies ArticleDetailArticle
