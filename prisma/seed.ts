import db from '@/functions/libs/drizzle-client/drizzle'
import {
  users,
  categories,
  articles,
} from '@/../../drizzle/schema'
import { prismaCategories } from '@/functions/constants/categories'
import { prismaUsers } from '@/functions/constants/users'
import { prismaArticles } from '@/functions/constants/articles'

async function main() {
  // delete all
  await db.delete(users)
  await db.delete(categories)
  await db.delete(articles)

  // seeding
  for (const category of prismaCategories) {
    await db.insert(categories).values(category)
  }

  for (const user of prismaUsers) {
    const [response] = await db.insert(users).values(user).returning()

    for (const article of prismaArticles) {
      await db.insert(articles).values({
        ...article,
        authorId: response.id,
      })
    }
  }
}

main()
  .then(async () => {
    console.log('Seeding completed successfully!')
    process.exit(0)
  })
  .catch(async (e) => {
    console.error('Seeding failed:', e)
    process.exit(1)
  })

// Contains AI-generated edits.
