/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as RowDialog from '@radix-ui/react-dialog'
import styles from '../index.module.scss'

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
