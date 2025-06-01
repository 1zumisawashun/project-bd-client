import * as RowMenubar from '@radix-ui/react-menubar'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menubar'
type Props = {} & RowMenubar.MenubarTriggerProps
type Ref = ElementRef<'button'>
export const MenubarTrigger = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => (
    <RowMenubar.Trigger
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}-trigger`], className)}
    />
  ),
)

MenubarTrigger.displayName = 'MenubarTrigger'
