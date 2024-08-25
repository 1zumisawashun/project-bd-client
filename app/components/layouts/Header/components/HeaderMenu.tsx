import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { routes } from '@/functions/constants/routes'
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '../../../elements/DropdownMenu'
import { IconButton } from '../../../buttons/IconButton'
import { AnchorButton } from '../../../buttons/AnchorButton'
import styles from '../index.module.scss'

const BLOCK_NAME = 'header-menu'

export const HeaderMenu: React.FC = () => {
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
