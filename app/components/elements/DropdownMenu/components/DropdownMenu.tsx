import * as RowDropdownMenu from '@radix-ui/react-dropdown-menu'
import { FC } from 'react'

type Props = {} & RowDropdownMenu.DropdownMenuProps
export const DropdownMenu: FC<Props> = (props) => {
  return <RowDropdownMenu.Root {...props} />
}

DropdownMenu.displayName = 'DropdownMenu'
