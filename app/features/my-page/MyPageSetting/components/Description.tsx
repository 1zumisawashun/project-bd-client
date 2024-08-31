import styles from '../MyPageSetting.module.scss'

const BLOCK_NAME = 'my-page-setting'

export const Description: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <p className={styles[`${BLOCK_NAME}-description`]}>{children}</p>
}
