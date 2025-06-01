import * as RowRadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'radio-group'
type Props = {} & RowRadioGroup.RadioGroupProps
type Ref = ElementRef<'div'>
export const RadioGroup = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowRadioGroup.Root
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
