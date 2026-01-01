import db from '@/functions/libs/drizzle-client/drizzle'
import { categories } from '@/../../drizzle/schema'
import { eq } from 'drizzle-orm'

export const getCategories = async () => {
  try {
    const categoriesList = await db.query.categories.findMany()
    return categoriesList
  } catch {
    return null
  }
}
export const getCategoryByName = async ({ name }: { name: string }) => {
  try {
    const category = await db.query.categories.findFirst({
      where: eq(categories.name, name),
    })
    return category ?? null
  } catch {
    throw new Error('Failed to get category')
  }
}
export const createCategory = async ({ name }: { name: string }) => {
  try {
    const [category] = await db
      .insert(categories)
      .values({ name })
      .returning()
    return category
  } catch {
    throw new Error('Failed to create category')
  }
}

// Contains AI-generated edits.
