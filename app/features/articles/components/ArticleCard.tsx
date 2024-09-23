import { Article, User } from '@/functions/types'
import styles from '../articles.module.scss'

const BLOCK_NAME = 'articles'
type Props = {
  article: Article | User['posts'][number]
}
export const ArticleCard: React.FC<Props> = ({ article }) => {
  const { title, createdAt } = article

  return (
    <div className={styles[`${BLOCK_NAME}-card`]}>
      <h2 className={styles[`${BLOCK_NAME}-card-title`]}>{title}</h2>
      <div className={styles[`${BLOCK_NAME}-card-content`]}>
        <p>神奈川 太郎</p>
        <p>{createdAt.toDateString()}</p>
      </div>
    </div>
  )
}
