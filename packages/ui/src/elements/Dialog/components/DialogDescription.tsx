import { Dialog } from '@base-ui/react/dialog'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'dialog-description'

type DialogDescriptionProps = ComponentProps<typeof Dialog.Description>

type CustomProps = {}

type Props = DialogDescriptionProps & CustomProps

type Ref = ElementRef<'p'>

export const DialogDescription = forwardRef<Ref, Props>(
  (
    {
      // native props
      className,
      // other props
      ...props
    },
    ref,
  ) => (
    <Dialog.Description
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}`], className)}
    />
  ),
)

DialogDescription.displayName = 'DialogDescription'
