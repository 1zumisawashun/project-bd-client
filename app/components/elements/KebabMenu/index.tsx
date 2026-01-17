import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { FC } from 'react'
import { IconButton } from '@/components/buttons/IconButton'
import { Menu, MenuList, MenuTrigger } from '../Menu'

type KebabMenuProps = {
  render: FC
}

export const KebabMenu: FC<KebabMenuProps> = (props) => {
  return (
    <Menu>
      <MenuTrigger
        render={
          <IconButton variant="outlined">
            <DotsVerticalIcon />
          </IconButton>
        }
      />
      <MenuList>
        <props.render />
      </MenuList>
    </Menu>
  )
}
