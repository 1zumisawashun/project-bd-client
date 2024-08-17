import styles from './index.module.scss'

const BLOCK_NAME = 'article-card'

type Article = {
  id: string
  title: string
  content: string
  status: string
  published: boolean
  updatedAt: Date
  createdAt: Date
  categories: {
    id: string
    name: string
  }[]
}

export const ArticleCard: React.FC<{
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

export const ArticleCardGroup: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  return <div className={styles[`${BLOCK_NAME}-group`]} {...props} />
}
