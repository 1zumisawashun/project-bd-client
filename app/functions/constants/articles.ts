import { Prisma } from '@prisma/client'
import { Article } from '@/functions/types'
import { content } from './content'
import { mockCategories } from './categories'

const id = 'cm07vrx4y00002vwkx0koma0j'

export const mockArticles = [
  {
    id: `post1-${id}`,
    title: 'テクノロジー',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    categories: mockCategories,
  },
  {
    id: `post2-${id}`,
    title: 'ファッション',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    categories: mockCategories,
  },
  {
    id: `post3-${id}`,
    title: '食品と飲料',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    categories: mockCategories,
  },
  {
    id: `post4-${id}`,
    title: '健康とウェルネス',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    categories: mockCategories,
  },
  {
    id: `post5-${id}`,
    title: 'スポーツ',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    categories: mockCategories,
  },
  {
    id: `post6-${id}`,
    title: 'エンターテイメント',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
    categories: mockCategories,
  },
] satisfies Article[]

export const prismaArticles: Prisma.ArticleCreateInput[] = mockArticles.map(
  (d) => {
    return {
      title: d.title,
      content: d.content,
      status: d.status,
    }
  },
)
