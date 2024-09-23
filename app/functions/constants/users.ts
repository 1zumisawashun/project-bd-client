import { Prisma } from '@prisma/client'
import { User } from '@/functions/types'
import { mockArticles } from './articles'

const id = 'cm07vrx4y00002vwkx0koma0j'

const hashedPassword =
  '$2a$12$e5k13fMVSLEvm3IYMndk4uBWE71w3kXRgEiZP99J53BYC29UcNTWy' // Test1234

export const mockUsers = [
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
    posts: mockArticles,
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
    posts: mockArticles,
  },
] satisfies User[]

export const prismaUsers: Prisma.UserCreateInput[] = mockUsers.map(
  ({ posts, ...rest }) => rest,
)
