import * as RowDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'dialog'
type Props = {} & RowDialog.DialogDescriptionProps
type Ref = ElementRef<'p'>
export const DialogDescription = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => (
    <RowDialog.Description
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}-description`], className)}
    />
  ),
)

DialogDescription.displayName = 'DialogDescription'
