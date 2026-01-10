import db from '@/functions/libs/drizzle-client/drizzle'
import { users, categories, articles } from '@/../drizzle/schema'
import { drizzleCategories } from '@/functions/constants/categories'
import { drizzleUsers } from '@/functions/constants/users'
import { drizzleArticles } from '@/functions/constants/articles'

async function main() {
  // delete all
  await db.delete(articles)
  await db.delete(users)
  await db.delete(categories)

  // seeding
  for (const category of drizzleCategories) {
    await db.insert(categories).values(category)
  }

  for (const user of drizzleUsers) {
    await db.insert(users).values(user)

    for (const article of drizzleArticles) {
      await db.insert(articles).values({
        ...article,
        authorId: user.id,
      })
    }
  }

  console.log('Seeding completed!')
}

main()
  .then(() => {
    console.log('Seed finished successfully')
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
// Contains AI-generated edits.
