import * as Form from '@radix-ui/react-form'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'form'
type Props = {} & Form.FormMessageProps
type Ref = ElementRef<'span'>
export const FormErrorMessage = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Form.Message
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-error-message`], className)}
      />
    )
  },
)

FormErrorMessage.displayName = 'FormErrorMessage'
