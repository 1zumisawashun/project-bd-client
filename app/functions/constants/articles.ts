import type { InsertArticle } from '@/../drizzle/schema'
import { Articles, Article } from '@/functions/types'
import { content } from './content'
import { mockCategories } from './categories'

const id = 'cm07vrx4y00002vwkx0koma0j'

export const mockArticle = {
  id: `post1-${id}`,
  title: 'テクノロジー',
  content,
  status: 'PUBLISHED',
  authorId: `user-${id}`,
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  categories: mockCategories,
  likedUsers: [],
} satisfies Article

export const mockArticlePublish = {
  id: `post1-${id}`,
  title: 'テクノロジー',
  content,
  status: 'PUBLISHED',
  authorId: `user-${id}`,
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  categories: mockCategories,
  likedUsers: [],
} satisfies Article

export const mockArticleDraft = {
  id: `post1-${id}`,
  title: 'テクノロジー',
  content,
  status: 'DRAFT',
  authorId: `user-${id}`,
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  categories: mockCategories,
  likedUsers: [],
} satisfies Article

export const mockArticles = [
  {
    id: `post1-${id}`,
    title: 'テクノロジーテクノロジーテクノロジー',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    author: { name: 'user' },
  },
  {
    id: `post2-${id}`,
    title: 'ファッションファッションファッション',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    author: { name: 'user' },
  },
  {
    id: `post3-${id}`,
    title: '食品と飲料食品と飲料食品と飲料',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    author: { name: 'user' },
  },
  {
    id: `post4-${id}`,
    title: '健康とウェルネス健康とウェルネス健康とウェルネス',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    author: { name: 'user' },
  },
  {
    id: `post5-${id}`,
    title: 'スポーツスポーツスポーツ',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    author: { name: 'user' },
  },
  {
    id: `post6-${id}`,
    title: 'エンターテイメントエンターテイメントエンターテイメント',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    author: { name: 'user' },
  },
] satisfies Articles

export const drizzleArticles: InsertArticle[] = mockArticles.map(
  (d) => {
    return {
      id: d.id,
      title: d.title,
      content: d.content,
      status: d.status,
      authorId: d.authorId,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }
  },
)
// Contains AI-generated edits.
