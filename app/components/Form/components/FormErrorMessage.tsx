/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as Form from '@radix-ui/react-form'
import styles from '../index.module.scss'

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
