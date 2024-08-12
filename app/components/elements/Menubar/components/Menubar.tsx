import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as RowMenubar from '@radix-ui/react-menubar'
import styles from '../index.module.scss'

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
