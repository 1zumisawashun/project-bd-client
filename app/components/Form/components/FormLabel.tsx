/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as Form from '@radix-ui/react-form'
import styles from '../index.module.scss'

const BLOCK_NAME = 'form'
type Props = {} & Form.FormLabelProps

type Ref = ElementRef<'label'>
export const FormLabel = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Form.Label
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-label`], className)}
      />
    )
  },
)
FormLabel.displayName = 'FormLabel'
