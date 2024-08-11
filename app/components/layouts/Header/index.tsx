import styles from './index.module.scss'
import { HeaderMenu } from './components/HeaderMenu'
import { AnchorButton } from '../../buttons/AnchorButton'

const BLOCK_NAME = 'header'
export const Header: React.FC = () => {
  return (
    <header className={styles[`${BLOCK_NAME}`]}>
      <AnchorButton href="/">project-bd-client</AnchorButton>
      <HeaderMenu />
    </header>
  )
}
