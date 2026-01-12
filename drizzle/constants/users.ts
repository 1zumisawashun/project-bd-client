import { type User } from '@/drizzle/schema'

const ID = 'cm07vrx4y00002vwkx0koma0j'

const HASHED_PASSWORD =
  '$2a$12$rPoIPJ1G9UfhP7awiq6CYu2inajTrnWHFopVguF0kvEqkSu8q93A6' // Test1234!

export const MOCK_USER = {
  id: `USER_${ID}`,
  name: 'user',
  email: 'user@example.com',
  emailVerified: null,
  image: null,
  hashedPassword: HASHED_PASSWORD,
  role: 'USER',
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
} satisfies User

const MOCK_ADMIN = {
  id: `ADMIN_${ID}`,
  name: 'admin',
  email: 'admin@example.com',
  emailVerified: null,
  image: null,
  hashedPassword: HASHED_PASSWORD,
  role: 'ADMIN',
  createdAt: new Date('2024-08-31T05:16:36.323Z'),
  updatedAt: new Date('2024-08-31T05:16:36.323Z'),
} satisfies User

export const MOCK_USERS = [MOCK_USER, MOCK_ADMIN] satisfies User[]
