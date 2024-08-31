import prisma from '@/functions/libs/prisma-client/prisma'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
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
  data: { email?: string; name?: string }
}) => {
  try {
    const user = await prisma.user.update({ where: { id }, data })
    return user
  } catch (e) {
    throw new Error('Failed to update user')
  }
}
