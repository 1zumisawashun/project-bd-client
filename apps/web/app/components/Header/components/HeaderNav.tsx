'use client'

import { AnchorButton, HamburgerMenu, VStack } from '@project-bd-client/ui'
import styles from '../index.module.css'

type Route = { label: string; href: string }

type HeaderNavProps = {
  routes: Route[]
  blockName: string
}

export const HeaderNav = ({ routes, blockName }: HeaderNavProps) => {
  return (
    <HamburgerMenu
      render={() => (
        <VStack gap={1}>
          {routes.map((d) => (
            <AnchorButton
              key={d.href}
              variant="ghost"
              shape="sharp"
              href={d.href}
              className={styles[`${blockName}-anchor-button`]!}
            >
              {d.label}
            </AnchorButton>
          ))}
        </VStack>
      )}
    />
  )
}
