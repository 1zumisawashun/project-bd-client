import db from '@/functions/libs/drizzle/client'
import { categories } from '@/functions/libs/drizzle/schema'
import { eq } from 'drizzle-orm'

export const getCategories = async () => {
  try {
    const allCategories = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories)

    return allCategories ?? null
  } catch {
    throw new Error('Failed to get categories')
  }
}

export const getCategoryByName = async ({ name }: { name: string }) => {
  try {
    const category = await db.query.categories.findFirst({
      where: eq(categories.name, name),
    })

    return category ?? null
  } catch {
    throw new Error('Failed to get category by name')
  }
}

export const createCategory = async ({ name }: { name: string }) => {
  try {
    const [category] = await db
      .insert(categories)
      .values({ name, id: crypto.randomUUID() })
      .returning()

    return category ?? null
  } catch {
    throw new Error('Failed to create category')
  }
}
