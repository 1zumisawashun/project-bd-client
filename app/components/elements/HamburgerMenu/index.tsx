import { IconButton } from '@/components/buttons/IconButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/elements/DropdownMenu'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

type Props = {
  render: React.FC
}
export const HamburgerMenu: React.FC<Props> = (props) => {
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
