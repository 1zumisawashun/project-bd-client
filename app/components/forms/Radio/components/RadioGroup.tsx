import { RadioGroup as RowRadioGroup } from '@base-ui/react/radio-group'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'radio-group'

type RadioGroupProps = ComponentProps<typeof RowRadioGroup>

type CustomProps = {}

type Props = RadioGroupProps & CustomProps

type Ref = ElementRef<'div'>

export const RadioGroup = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowRadioGroup
        {...props}
        // native props
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
