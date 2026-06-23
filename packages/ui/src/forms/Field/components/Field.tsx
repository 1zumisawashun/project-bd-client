import { Field as RowField } from '@base-ui/react/field'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'field'

type FieldProps = ComponentProps<typeof RowField.Root>

type CustomProps = {}

type Props = FieldProps & CustomProps

type Ref = ElementRef<'div'>

export const Field = forwardRef<Ref, Props>(({ className, ...props }, ref) => {
  return (
    <RowField.Root
      {...props}
      // native props
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}`], className)}
    />
  )
})

Field.displayName = 'Field'
