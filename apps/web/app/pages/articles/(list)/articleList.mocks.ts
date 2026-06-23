import { MOCK_ARTICLES } from '@/functions/libs/drizzle/constants/articles'
import { MOCK_USER } from '@/functions/libs/drizzle/constants/users'
import { ArticleListArticle } from './articleList.types'

export const MOCK_ARTICLE_LIST_ARTICLE = MOCK_ARTICLES.map((article) => ({
  ...article,
  author: MOCK_USER,
})) satisfies ArticleListArticle[]
