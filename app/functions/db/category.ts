import db from '@/functions/libs/drizzle-client/db'
import { categories } from '@/functions/libs/drizzle-client/schema'
import { eq } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'

export const getCategories = async () => {
  try {
    const result = await db.select().from(categories)
    return result
  } catch {
    return null
  }
}

export const getCategoryByName = async ({ name }: { name: string }) => {
  try {
    const [category] = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name))
    return category ?? null
  } catch {
    throw new Error('Failed to get category')
  }
}

export const createCategory = async ({ name }: { name: string }) => {
  try {
    const [category] = await db
      .insert(categories)
      .values({ id: createId(), name })
      .returning()
    return category
  } catch {
    throw new Error('Failed to create category')
  }
}

// Contains AI-generated edits.
