import { Prisma, User } from '@prisma/client'
import { baseArticles } from './articles'

const id = 'cm07vrx4y00002vwkx0koma0j'

const hashedPassword =
  '$2a$12$e5k13fMVSLEvm3IYMndk4uBWE71w3kXRgEiZP99J53BYC29UcNTWy' // Test1234

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
  posts: baseArticles,
}))

export const prismaUsers: Prisma.UserCreateInput[] = baseUsers
