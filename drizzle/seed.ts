import db from './index'
import { users, categories, articles } from './schema'
import { drizzleCategories } from '@/functions/constants/categories'
import { drizzleUsers } from '@/functions/constants/users'
import { drizzleArticles } from '@/functions/constants/articles'
import { createId } from '@paralleldrive/cuid2'

async function main() {
  console.log('Starting seed...')

  // Delete all existing data
  await db.delete(articles)
  await db.delete(categories)
  await db.delete(users)
  console.log('Deleted existing data')

  // Seed categories
  for (const category of drizzleCategories) {
    await db.insert(categories).values(category)
  }
  console.log('Seeded categories')

  // Seed users
  for (const user of drizzleUsers) {
    const [createdUser] = await db.insert(users).values(user).returning()
    if (!createdUser) {
      throw new Error('Failed to create user')
    }
    console.log(`Created user: ${createdUser.email}`)

    // Seed articles for this user
    for (const article of drizzleArticles) {
      await db.insert(articles).values({
        id: createId(),
        ...article,
        authorId: createdUser.id,
      })
    }
    console.log(`Created ${drizzleArticles.length} articles for user`)
  }

  console.log('Seed completed successfully!')
}

main()
  .then(() => {
    console.log('Disconnecting...')
    process.exit(0)
  })
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })

// Contains AI-generated edits.
