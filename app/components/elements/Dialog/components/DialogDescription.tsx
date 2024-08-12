import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as RowDialog from '@radix-ui/react-dialog'
import styles from '../index.module.scss'

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
