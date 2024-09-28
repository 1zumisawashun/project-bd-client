import prisma from '@/functions/libs/prisma-client/prisma'
import { Prisma } from '@prisma/client'

export const getArticles = async () => {
  try {
    const articles = await prisma.article.findMany({
      include: { author: { select: { name: true } } },
    })
    return articles
  } catch {
    return null
  }
}
export const getArticleById = async ({ id }: { id: string }) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: { categories: true, likedUsers: { select: { id: true } } },
    })
    return article
  } catch {
    return null
  }
}
export const createArticle = async ({
  data,
}: {
  data: Prisma.ArticleCreateInput
}) => {
  try {
    const article = await prisma.article.create({ data })
    return article
  } catch {
    throw new Error('Failed to create article')
  }
}
export const deleteArticle = async ({ id }: { id: string }) => {
  try {
    const article = await prisma.article.delete({ where: { id } })
    return article
  } catch {
    throw new Error('Failed to delete article')
  }
}
export const updateArticle = async ({
  id,
  data,
}: {
  id: string
  data: Prisma.ArticleUpdateInput
}) => {
  try {
    const article = await prisma.article.update({ where: { id }, data })
    return article
  } catch {
    throw new Error('Failed to update article')
  }
}
