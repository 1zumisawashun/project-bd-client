import db from '@/functions/libs/drizzle-client/drizzle'
import { MOCK_ARTICLES } from './constants/articles'
import { MOCK_CATEGORIES } from './constants/categories'
import { MOCK_USERS } from './constants/users'
import { articles, articlesCategories, categories, users } from './schema'

async function main() {
  // delete all
  // delete relations first due to foreign key constraints
  await db.delete(articlesCategories)
  await db.delete(articles)
  await db.delete(users)
  await db.delete(categories)

  console.log('Deleted existing data')

  // seeding
  for (const category of MOCK_CATEGORIES) {
    await db.insert(categories).values(category)
  }

  for (const user of MOCK_USERS) {
    await db.insert(users).values(user)
  }

  for (const article of MOCK_ARTICLES) {
    await db.insert(articles).values({
      ...article,
      authorId: MOCK_USERS[0]!.id,
    })
    /**
     * NOTE:
     * Bulk insert multiple rows
     * @see https://orm.drizzle.team/docs/insert#insert-multiple-rows
     */
    await db.insert(articlesCategories).values(
      MOCK_CATEGORIES.map(({ id: categoryId }) => ({
        articleId: article.id,
        categoryId,
      })),
    )
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
