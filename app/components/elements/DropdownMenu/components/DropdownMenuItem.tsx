import * as RowDropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'dropdown-menu'
type Props = {} & RowDropdownMenu.DropdownMenuItemProps
type Ref = ElementRef<'div'>
export const DropdownMenuItem = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowDropdownMenu.Item
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-item`], className)}
      />
    )
  },
)

DropdownMenuItem.displayName = 'DropdownMenuItem'
