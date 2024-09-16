/* eslint-disable no-await-in-loop */
import { PrismaClient } from '@prisma/client'
import { categories } from '@/functions/constants/categories'
import { users } from '@/functions/constants/users'

const prisma = new PrismaClient()

async function main() {
  // delete all
  await prisma.user.deleteMany()
  await prisma.category.deleteMany()
  await prisma.article.deleteMany()

  // seeding
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    })
  }

  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
