import { Articles } from '@/functions/types'
import { formatDateToJapaneseDate } from '@/functions/helpers/dateFormatter'
import styles from '../articles.module.scss'

const BLOCK_NAME = 'articles'
type Props = {
  article: Articles[number]
}
export const ArticleCard: React.FC<Props> = ({ article }) => {
  const { title, createdAt } = article

  return (
    <div className={styles[`${BLOCK_NAME}-card`]}>
      <h2 className={styles[`${BLOCK_NAME}-card-title`]}>{title}</h2>
      <div className={styles[`${BLOCK_NAME}-card-content`]}>
        <p>{article.author?.name}</p>
        <p>{formatDateToJapaneseDate(new Date(createdAt))}</p>
      </div>
    </div>
  )
}
