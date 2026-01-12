import { formatDateToJapaneseDate } from '@/functions/helpers/dateFormatter'
import { FC } from 'react'
import styles from './articleCard.module.css'

const BLOCK_NAME = 'articleCard'

type ArticleCardProps = {
  article: {
    title: string
    createdAt: Date
    content: string
    author: {
      name: string | null
    }
  }
}

export const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
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
