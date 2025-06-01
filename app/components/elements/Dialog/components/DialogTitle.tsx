import * as RowDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'dialog'
type Props = {} & RowDialog.DialogTitleProps
type Ref = ElementRef<'h1'>
export const DialogTitle = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => (
    <RowDialog.Title
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}-title`], className)}
    />
  ),
)

DialogTitle.displayName = 'DialogTitle'
