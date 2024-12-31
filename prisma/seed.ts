import { PrismaClient } from '@prisma/client'
import { prismaCategories } from '@/functions/constants/categories'
import { prismaUsers } from '@/functions/constants/users'
import { prismaArticles } from '@/functions/constants/articles'

const prisma = new PrismaClient()

async function main() {
  // delete all
  await prisma.user.deleteMany()
  await prisma.category.deleteMany()
  await prisma.article.deleteMany()

  // seeding
  for (const category of prismaCategories) {
    await prisma.category.create({
      data: category,
    })
  }

  for (const user of prismaUsers) {
    const response = await prisma.user.create({
      data: user,
    })

    await prisma.article.createMany({
      data: prismaArticles.map((d) => ({
        ...d,
        authorId: response.id,
      })),
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
