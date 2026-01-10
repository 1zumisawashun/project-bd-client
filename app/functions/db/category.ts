import db from '@/functions/libs/drizzle-client/drizzle'
import { categories } from '@/../drizzle/schema'
import { eq } from 'drizzle-orm'

export const getCategories = async () => {
  try {
    const allCategories = await db.query.categories.findMany()
    return allCategories
  } catch {
    return null
  }
}

export const getCategoryByName = async ({ name }: { name: string }) => {
  try {
    const category = await db.query.categories.findFirst({
      where: eq(categories.name, name),
    })
    return category || null
  } catch {
    throw new Error('Failed to get category')
  }
}

export const createCategory = async ({ name }: { name: string }) => {
  try {
    const category = await db.insert(categories).values({ name, id: crypto.randomUUID() }).returning()
    return category[0]
  } catch {
    throw new Error('Failed to create category')
  }
}
// Contains AI-generated edits.
