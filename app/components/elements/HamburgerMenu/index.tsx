import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { IconButton } from '@/components/buttons/IconButton'
import { Menu, MenuList, MenuTrigger } from '../Menu'

type HamburgerMenuProps = {
  render: FC
}

export const HamburgerMenu: FC<HamburgerMenuProps> = (props) => {
  return (
    <Menu>
      <MenuTrigger
        render={
          <IconButton variant="outlined">
            <HamburgerMenuIcon />
          </IconButton>
        }
      />
      <MenuList>
        <props.render />
      </MenuList>
    </Menu>
  )
}
