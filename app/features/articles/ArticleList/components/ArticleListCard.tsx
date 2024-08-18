import styles from '../ArticleList.module.scss'
import { Article } from '../../articles.type'

const BLOCK_NAME = 'article-list-card'

export const ArticleListCard: React.FC<{
  article: Article
}> = ({ article }) => {
  const { title } = article

  return (
    <div className={styles[`${BLOCK_NAME}`]}>
      <div className={styles[`${BLOCK_NAME}-layer`]}>
        <div className={styles[`${BLOCK_NAME}-thumbnail`]}>
          <p className={styles[`${BLOCK_NAME}-title`]}>{title}</p>
        </div>
      </div>

      <div className={styles[`${BLOCK_NAME}-content`]}>
        <p>神奈川 太郎</p>
      </div>
    </div>
  )
}
