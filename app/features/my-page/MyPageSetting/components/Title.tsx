import styles from '../MyPageSetting.module.scss'

const BLOCK_NAME = 'my-page-setting'

export const Title: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <h2 className={styles[`${BLOCK_NAME}-title`]}>{children}</h2>
}
