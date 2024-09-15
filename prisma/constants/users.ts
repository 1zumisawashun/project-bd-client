import { Prisma } from '@prisma/client'

export const users: Prisma.UserCreateInput[] = [
  {
    name: 'admin1',
    email: 'admin1@example.com',
    hashedPassword:
      '$2a$12$e5k13fMVSLEvm3IYMndk4uBWE71w3kXRgEiZP99J53BYC29UcNTWy', // Test1234
    role: 'ADMIN',
  },
  {
    name: 'user1',
    email: 'user1@example.com',
    hashedPassword:
      '$2a$12$e5k13fMVSLEvm3IYMndk4uBWE71w3kXRgEiZP99J53BYC29UcNTWy', // Test1234
    role: 'USER',
  },
]
