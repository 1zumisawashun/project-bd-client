import * as RowDialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'dialog'
type Props = {} & RowDialog.DialogContentProps
type Ref = ElementRef<'div'>
export const DialogContent = forwardRef<Ref, Props>(
  ({ children, className, ...props }, ref) => (
    <RowDialog.Portal>
      <RowDialog.Overlay className={styles[`${BLOCK_NAME}-overlay`]} />
      <RowDialog.Content
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-content`], className)}
      >
        {children}
      </RowDialog.Content>
    </RowDialog.Portal>
  ),
)

DialogContent.displayName = 'DialogContent'
