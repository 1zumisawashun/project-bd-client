/* eslint-disable no-await-in-loop */
import { PrismaClient } from '@prisma/client'
import { categories, users } from './constants'

const prisma = new PrismaClient()

async function main() {
  // delete all
  await prisma.user.deleteMany()
  await prisma.category.deleteMany()
  // await prisma.article.deleteMany()

  // seeding
  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }

  // NOTE:categoryが存在しないとproducts作成でconnectできないので先にcategoryを作成する
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    })
  }

  // for (const article of articles) {
  //   await prisma.article.create({
  //     data: article,
  //   })
  // }
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
