import { IconButton } from '@/components/buttons/IconButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/elements/DropdownMenu'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { FC } from 'react'

type Props = {
  render: FC
}
export const HamburgerMenu: FC<Props> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton variant="outlined">
          <HamburgerMenuIcon />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <props.render />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
