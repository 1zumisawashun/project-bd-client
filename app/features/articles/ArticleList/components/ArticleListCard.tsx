import styles from '../ArticleList.module.scss'
import { Article } from '../../articles.type'

const BLOCK_NAME = 'article-list-card'

export const ArticleListCard: React.FC<{
  article: Article
}> = ({ article }) => {
  const { title, createdAt } = article

  return (
    <div className={styles[`${BLOCK_NAME}`]}>
      <h2 className={styles[`${BLOCK_NAME}-title`]}>{title}</h2>
      <div className={styles[`${BLOCK_NAME}-content`]}>
        <p>神奈川 太郎</p>
        <p>{createdAt.toDateString()}</p>
      </div>
    </div>
  )
}
