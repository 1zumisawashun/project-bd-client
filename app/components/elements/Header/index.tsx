import { auth } from '@/functions/libs/next-auth/auth'
import {
  authRouteOptions,
  publicRouteOptions,
  privateRouteOptions,
} from '@/functions/constants/routes'
import styles from './index.module.scss'
import { HamburgerMenu } from '../HamburgerMenu'
import { AnchorButton } from '../../buttons/AnchorButton'

const BLOCK_NAME = 'header'

// NOTE: RSCに依存しているためカタログに追加できない
export const Header: React.FC = async () => {
  const session = await auth()
  const isAuthenticated = !!session

  const routes = isAuthenticated
    ? [...publicRouteOptions, ...privateRouteOptions]
    : [...authRouteOptions, ...publicRouteOptions]

  return (
    <header className={styles[`${BLOCK_NAME}`]}>
      <AnchorButton href="/" variant="ghost">
        project-bd
      </AnchorButton>
      <HamburgerMenu
        render={() => (
          <>
            {routes.map((d) => (
              <AnchorButton
                key={d.href}
                variant="ghost"
                href={d.href}
                className={styles[`${BLOCK_NAME}-anchor-button`]}
              >
                {d.label}
              </AnchorButton>
            ))}
          </>
        )}
      />
    </header>
  )
}
