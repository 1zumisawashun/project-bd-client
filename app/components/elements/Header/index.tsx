import { FC } from 'react'
import { VStack } from '@/components/layouts/VStack'
import { getSession } from '@/functions/libs/next-auth/session'
import { AnchorButton } from '../../buttons/AnchorButton'
import { HamburgerMenu } from '../HamburgerMenu'
import { getFlatMenu } from './helpers/getFlatMenu'
import styles from './index.module.css'

const BLOCK_NAME = 'header'

// NOTE: RSCに依存しているためカタログに追加できない
export const Header: FC = async () => {
  const session = await getSession()
  const routes = getFlatMenu({ isPrivate: !!session, isAuth: !session })

  return (
    <header className={styles[`${BLOCK_NAME}`]}>
      <AnchorButton href="/" variant="ghost">
        project-bd
      </AnchorButton>
      <HamburgerMenu
        render={() => (
          <VStack gap={1}>
            {routes.map((d) => (
              <AnchorButton
                key={d.href}
                variant="ghost"
                shape="sharp"
                href={d.href}
                className={styles[`${BLOCK_NAME}-anchor-button`]!}
              >
                {d.label}
              </AnchorButton>
            ))}
          </VStack>
        )}
      />
    </header>
  )
}
