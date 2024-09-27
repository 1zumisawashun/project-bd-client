import prisma from '@/functions/libs/prisma-client/prisma'

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

export const getArticleById = async (id: string) => {
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
