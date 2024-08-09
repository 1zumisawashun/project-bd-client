/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import * as RowDropdownMenu from '@radix-ui/react-dropdown-menu'

type Props = {} & RowDropdownMenu.DropdownMenuProps
export const DropdownMenuRoot: React.FC<Props> = (props) => {
  return <RowDropdownMenu.Root {...props} />
}

DropdownMenuRoot.displayName = 'DropdownMenuRoot'
