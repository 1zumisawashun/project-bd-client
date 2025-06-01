import * as RowMenubar from '@radix-ui/react-menubar'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menubar'
type Props = {} & RowMenubar.MenubarContentProps
type Ref = ElementRef<'div'>
export const MenubarContent = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => (
    <RowMenubar.Portal>
      <RowMenubar.Content
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-content`], className)}
      />
    </RowMenubar.Portal>
  ),
)

MenubarContent.displayName = 'MenubarContent'
