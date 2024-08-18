import clsx from 'clsx'
import { forwardRef, ElementRef } from 'react'
import * as RowRadioGroup from '@radix-ui/react-radio-group'
import styles from '../index.module.scss'

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
