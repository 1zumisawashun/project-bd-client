import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as RowMenubar from '@radix-ui/react-menubar'
import styles from '../index.module.scss'

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
