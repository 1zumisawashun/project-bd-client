import * as RowMenubar from '@radix-ui/react-menubar'
import { FC } from 'react'

type Props = {} & RowMenubar.MenubarMenuProps
export const MenubarMenu: FC<Props> = (props) => (
  <RowMenubar.MenubarMenu {...props} />
)

MenubarMenu.displayName = 'MenubarMenu'
