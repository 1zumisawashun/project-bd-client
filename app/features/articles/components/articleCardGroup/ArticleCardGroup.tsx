import styles from './articleCardGroup.module.scss'

const BLOCK_NAME = 'articleCardGroup'
type Props = {
  children: React.ReactNode
}
export const ArticleCardGroup: React.FC<Props> = (props) => {
  return <div className={styles[`${BLOCK_NAME}`]} {...props} />
}
