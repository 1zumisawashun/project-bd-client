import * as Form from '@radix-ui/react-form'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'form'
type Props = {} & Form.FormFieldProps
type Ref = ElementRef<'div'>
export const FormField = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Form.Field
        ref={ref}
        {...props}
        className={clsx(styles[`${BLOCK_NAME}-field`], className)}
      />
    )
  },
)

FormField.displayName = 'FormField'
