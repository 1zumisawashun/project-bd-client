import styles from './articleCardGroup.module.scss'

const BLOCK_NAME = 'articleCardGroup'
export const ArticleCardGroup: React.FC<React.PropsWithChildren> = (props) => {
  return <div className={styles[`${BLOCK_NAME}`]} {...props} />
}
