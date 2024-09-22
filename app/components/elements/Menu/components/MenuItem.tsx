import { Button } from '../../../buttons/Button'
import styles from '../index.module.scss'

const BLOCK_NAME = 'menu'
type Props = {
  onClick: () => void
  children: React.ReactNode
}
export const MenuItem: React.FC<Props> = ({ onClick, children }) => {
  return (
    <div className={styles[`${BLOCK_NAME}-item`]}>
      <Button
        onClick={onClick}
        variant="ghost"
        className={styles[`${BLOCK_NAME}-item-button`]}
      >
        {children}
      </Button>
      <hr className={styles[`${BLOCK_NAME}-item-separator`]} />
    </div>
  )
}
