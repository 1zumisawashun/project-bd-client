import * as RowMenubar from '@radix-ui/react-menubar'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menubar'
type Props = {} & RowMenubar.MenubarProps
type Ref = ElementRef<'div'>
export const Menubar = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => (
    <RowMenubar.Root
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}-root`], className)}
    />
  ),
)

Menubar.displayName = 'Menubar'
