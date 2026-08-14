import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'dialog-title'

type DialogTitleProps = ComponentProps<typeof Dialog.Title>

type CustomProps = {}

type Props = DialogTitleProps & CustomProps

type Ref = ElementRef<'h2'>

export const DialogTitle = forwardRef<Ref, Props>(
  (
    {
      // native props
      className,
      // other props
      ...props
    },
    ref,
  ) => (
    <Dialog.Title
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}`], className)}
    />
  ),
)

DialogTitle.displayName = 'DialogTitle'
