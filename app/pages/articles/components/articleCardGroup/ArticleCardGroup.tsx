import { FC, PropsWithChildren } from 'react'
import styles from './articleCardGroup.module.css'

const BLOCK_NAME = 'articleCardGroup'
export const ArticleCardGroup: FC<PropsWithChildren> = (props) => {
  return <div className={styles[`${BLOCK_NAME}`]} {...props} />
}
