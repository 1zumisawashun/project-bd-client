import * as RowDropdownMenu from '@radix-ui/react-dropdown-menu'
import { ElementRef, forwardRef } from 'react'

type Props = {} & RowDropdownMenu.DropdownMenuTriggerProps
type Ref = ElementRef<'button'>
export const DropdownMenuTrigger = forwardRef<Ref, Props>((props, ref) => {
  return <RowDropdownMenu.Trigger asChild {...props} ref={ref} />
})

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'
