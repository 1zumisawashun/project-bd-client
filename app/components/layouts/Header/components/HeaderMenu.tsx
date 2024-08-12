import { HamburgerMenuIcon } from '@radix-ui/react-icons'
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
        <AnchorButton
          variant="ghost"
          href="#"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          New Tab 1
        </AnchorButton>
        <AnchorButton
          variant="ghost"
          href="#"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          New Tab 2
        </AnchorButton>
        <AnchorButton
          variant="ghost"
          href="#"
          className={styles[`${BLOCK_NAME}-anchor-button`]}
        >
          New Tab 3
        </AnchorButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
