import * as RowForm from '@radix-ui/react-form'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

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
