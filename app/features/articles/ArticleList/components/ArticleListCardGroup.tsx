import styles from '../ArticleList.module.scss'

const BLOCK_NAME = 'article-list-card'
export const ArticleListCardGroup: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  return <div className={styles[`${BLOCK_NAME}-group`]} {...props} />
}
