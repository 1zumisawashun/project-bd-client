import { AnchorButton } from '@/components/buttons/AnchorButton'
import { Article } from '@prisma/client'

type Props = {
  article: Article
}
export const ArticleDetail: React.FC<Props> = ({ article }) => {
  return (
    <div>
      <p>article-detail</p>
      <AnchorButton href={`/articles/${article.id}/edit`}>Edit</AnchorButton>
    </div>
  )
}
