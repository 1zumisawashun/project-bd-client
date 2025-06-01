import * as RowMenubar from '@radix-ui/react-menubar'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menubar'
type Props = {} & RowMenubar.MenubarItemProps
type Ref = ElementRef<'div'>
export const MenubarItem = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => (
    <RowMenubar.Item
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}-item`], className)}
    />
  ),
)

MenubarItem.displayName = 'MenubarItem'
