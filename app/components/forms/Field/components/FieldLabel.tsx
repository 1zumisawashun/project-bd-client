import { Field } from '@base-ui/react/field'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'field-label'

type FieldLabelProps = ComponentProps<typeof Field.Label>

type CustomProps = {}

type Props = FieldLabelProps & CustomProps

type Ref = ElementRef<'label'>

export const FieldLabel = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Field.Label
        {...props}
        // native props
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

FieldLabel.displayName = 'FieldLabel'
