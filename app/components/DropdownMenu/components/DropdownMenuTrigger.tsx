/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import * as RowDropdownMenu from '@radix-ui/react-dropdown-menu'
import { forwardRef, ElementRef } from 'react'

type Props = {} & RowDropdownMenu.DropdownMenuTriggerProps
type Ref = ElementRef<'button'>
export const DropdownMenuTrigger = forwardRef<Ref, Props>((props, ref) => {
  return <RowDropdownMenu.Trigger asChild {...props} ref={ref} />
})

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'
