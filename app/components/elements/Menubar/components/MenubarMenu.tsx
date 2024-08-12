import * as RowMenubar from '@radix-ui/react-menubar'

type Props = {} & RowMenubar.MenubarMenuProps
export const MenubarMenu: React.FC<Props> = (props) => (
  <RowMenubar.MenubarMenu {...props} />
)

MenubarMenu.displayName = 'MenubarMenu'
