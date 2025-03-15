import * as RowDropdownMenu from '@radix-ui/react-dropdown-menu'

type Props = {} & RowDropdownMenu.DropdownMenuProps
export const DropdownMenu: React.FC<Props> = (props) => {
  return <RowDropdownMenu.Root {...props} />
}

DropdownMenu.displayName = 'DropdownMenu'
