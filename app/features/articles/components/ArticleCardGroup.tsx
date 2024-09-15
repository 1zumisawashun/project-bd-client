import styles from '../articles.module.scss'

const BLOCK_NAME = 'articles'
type Props = {
  children: React.ReactNode
}
export const ArticleCardGroup: React.FC<Props> = (props) => {
  return <div className={styles[`${BLOCK_NAME}-card-group`]} {...props} />
}
