import { Field } from '@base-ui/react/field'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'field-error'

type FieldErrorProps = ComponentProps<typeof Field.Error>

type CustomProps = {}

type Props = FieldErrorProps & CustomProps

type Ref = ElementRef<'div'>

export const FieldError = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Field.Error
        {...props}
        // native props
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

FieldError.displayName = 'FieldError'
