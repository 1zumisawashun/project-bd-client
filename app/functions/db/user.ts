import prisma from '@/functions/libs/prisma-client/prisma'
import { Prisma } from '@prisma/client'

export const getUserByEmail = async ({ email }: { email: string }) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch {
    return null
  }
}
export const getUserById = async ({ id }: { id: string }) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: { include: { author: { select: { name: true } } } },
        likedArticles: { include: { author: { select: { name: true } } } },
      },
    })
    return user
  } catch (e) {
    return null
  }
}
export const updateUser = async ({
  id,
  data,
}: {
  id: string
  data: Prisma.UserUpdateInput
}) => {
  try {
    const user = await prisma.user.update({ where: { id }, data })
    return user
  } catch (e) {
    throw new Error('Failed to update user')
  }
}
