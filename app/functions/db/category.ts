import prisma from '@/functions/libs/prisma-client/prisma'

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch {
    return null
  }
}

export const getCategoryByName = async (name: string) => {
  try {
    const category = await prisma.category.findFirst({ where: { name } })
    return category
  } catch {
    throw new Error('Failed to get category')
  }
}

export const createCategory = async (name: string) => {
  try {
    const category = await prisma.category.create({ data: { name } })
    return category
  } catch {
    throw new Error('Failed to create category')
  }
}
