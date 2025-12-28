import { IconButton } from '@/components/buttons/IconButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/elements/DropdownMenu'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { FC } from 'react'

type Props = {
  render: FC
}
export const KebabMenu: FC<Props> = (props) => {
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
