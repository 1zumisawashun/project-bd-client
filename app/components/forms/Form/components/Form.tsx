import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as RowForm from '@radix-ui/react-form'
import styles from '../index.module.scss'

const BLOCK_NAME = 'form'
type Props = {} & RowForm.FormProps
type Ref = ElementRef<'form'>
export const Form = forwardRef<Ref, Props>(({ className, ...props }, ref) => {
  return (
    <RowForm.Root
      ref={ref}
      {...props}
      className={clsx(styles[`${BLOCK_NAME}`], className)}
    />
  )
})

Form.displayName = 'Form'
