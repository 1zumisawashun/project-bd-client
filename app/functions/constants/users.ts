import { Prisma, Article, User } from '@prisma/client'
import { content } from '@/components/elements/Editor/index.constant'

const id = 'cm07vrx4y00002vwkx0koma0j'

const hashedPassword =
  '$2a$12$e5k13fMVSLEvm3IYMndk4uBWE71w3kXRgEiZP99J53BYC29UcNTWy' // Test1234

const basePosts = [
  {
    id: `post1-${id}`,
    title: 'テクノロジー',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: `post2-${id}`,
    title: 'ファッション',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: `post3-${id}`,
    title: '食品と飲料',
    content,
    status: 'PUBLISHED',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: `post4-${id}`,
    title: '健康とウェルネス',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: `post5-${id}`,
    title: 'スポーツ',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: `post6-${id}`,
    title: 'エンターテイメント',
    content,
    status: 'DRAFT',
    authorId: `user-${id}`,
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
] satisfies Article[]

const baseUsers = [
  {
    id: `admin-${id}`,
    name: 'admin',
    email: 'admin@example.com',
    emailVerified: null,
    image: null,
    hashedPassword,
    role: 'ADMIN',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
  {
    id: `user-${id}`,
    name: 'user',
    email: 'user@example.com',
    emailVerified: null,
    image: null,
    hashedPassword,
    role: 'USER',
    createdAt: new Date('2024-08-31T05:16:36.323Z'),
    updatedAt: new Date('2024-08-31T05:16:36.323Z'),
  },
] satisfies User[]

export const mockUsers = baseUsers.map((d) => ({
  ...d,
  posts: basePosts,
}))

export const users: Prisma.UserCreateInput[] = baseUsers.map((d) => ({
  ...d,
  posts: { createMany: { data: basePosts } },
}))
