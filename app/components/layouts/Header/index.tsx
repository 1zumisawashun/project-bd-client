import { auth } from '@/functions/libs/next-auth/auth'
import styles from './index.module.scss'
import { HeaderMenu } from './components/HeaderMenu'
import { AnchorButton } from '../../buttons/AnchorButton'

const BLOCK_NAME = 'header'

// NOTE: RSCに依存しているためカタログに追加できない
export const Header: React.FC = async () => {
  const session = await auth()
  const isAuthenticated = !!session

  return (
    <header className={styles[`${BLOCK_NAME}`]}>
      <AnchorButton href="/" variant="ghost">
        project-bd
      </AnchorButton>
      <HeaderMenu isAuthenticated={isAuthenticated} />
    </header>
  )
}
