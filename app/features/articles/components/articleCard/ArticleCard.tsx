import { formatDateToJapaneseDate } from '@/functions/helpers/dateFormatter'
import { Articles } from '@/functions/types'
import styles from './articleCard.module.css'

const BLOCK_NAME = 'articleCard'
type Props = {
  article: Articles[number]
}
export const ArticleCard: React.FC<Props> = ({ article }) => {
  const { title, createdAt } = article

  return (
    <div className={styles[`${BLOCK_NAME}`]}>
      <h2 className={styles[`${BLOCK_NAME}-title`]}>{title}</h2>
      <div className={styles[`${BLOCK_NAME}-content`]}>
        <p>{article.author?.name}</p>
        <p>{formatDateToJapaneseDate(new Date(createdAt))}</p>
      </div>
    </div>
  )
}
