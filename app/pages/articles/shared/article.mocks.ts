import {
  MOCK_ARTICLE_DRAFT,
  MOCK_ARTICLE_PUBLISH,
} from '@/functions/libs/drizzle/constants/articles'
import { MOCK_CATEGORIES } from '@/functions/libs/drizzle/constants/categories'
import { MOCK_USERS } from '@/functions/libs/drizzle/constants/users'
import { Article, ArticleCategory } from './article.types'

export const MOCK_ARTICLE_CATEGORIES = MOCK_CATEGORIES.map((category) => {
  return {
    id: category.id,
    name: category.name,
  }
}) satisfies ArticleCategory[]

export const _MOCK_ARTICLE_PUBLIC = {
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
} satisfies Article

export const _MOCK_ARTICLE_DRAFT = {
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
} satisfies Article
