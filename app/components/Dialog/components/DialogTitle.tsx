/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as RowDialog from '@radix-ui/react-dialog'
import styles from '../index.module.scss'

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
