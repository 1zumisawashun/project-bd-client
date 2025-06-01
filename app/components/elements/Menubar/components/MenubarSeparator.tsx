import * as RowMenubar from '@radix-ui/react-menubar'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menubar'
type Props = {} & RowMenubar.MenubarSeparatorProps
type Ref = ElementRef<'div'>
export const MenubarSeparator = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => (
    <RowMenubar.Separator
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}-separator`], className)}
    />
  ),
)

MenubarSeparator.displayName = 'MenubarSeparator'
