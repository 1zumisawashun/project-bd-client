import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  authRouteOptions,
  publicRouteOptions,
  privateRouteOptions,
} from '@/functions/constants/routes'
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/elements/DropdownMenu'
import { IconButton } from '@/components/buttons/IconButton'
import { AnchorButton } from '@/components/buttons/AnchorButton'
import styles from '../index.module.scss'

const BLOCK_NAME = 'header-menu'

export const HeaderMenu: React.FC<{ isAuthenticated: boolean }> = ({
  isAuthenticated,
}) => {
  const routes = isAuthenticated
    ? [...publicRouteOptions, ...privateRouteOptions]
    : [...authRouteOptions, ...publicRouteOptions]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton variant="ghost">
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
