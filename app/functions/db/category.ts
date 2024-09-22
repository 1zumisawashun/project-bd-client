import prisma from '@/functions/libs/prisma-client/prisma'

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch {
    return null
  }
}
