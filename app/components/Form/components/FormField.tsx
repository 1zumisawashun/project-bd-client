/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as Form from '@radix-ui/react-form'
import styles from '../index.module.scss'

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
