import { DotsVerticalIcon } from '@radix-ui/react-icons'
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/elements/DropdownMenu'
import { IconButton } from '@/components/buttons/IconButton'

type Props = {
  render: React.FC
}
export const KebabMenu: React.FC<Props> = (props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton variant="outlined">
          <DotsVerticalIcon />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <props.render />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}