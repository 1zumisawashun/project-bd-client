import { ArticleList } from '@/features/articles/ArticleList/ArticleList'
import prisma from '@/functions/libs/prisma-client/prisma'

export default async function Page() {
  const articles = await prisma.article.findMany()
  
  return <ArticleList articles={articles}/>
}
