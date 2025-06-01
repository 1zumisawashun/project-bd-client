import * as Form from '@radix-ui/react-form'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

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
