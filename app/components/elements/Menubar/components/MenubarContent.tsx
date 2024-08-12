import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as RowMenubar from '@radix-ui/react-menubar'
import styles from '../index.module.scss'

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
