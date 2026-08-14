import { RadioGroup as RowRadioGroup } from '@base-ui/react/radio-group'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'

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
        className={clsx('ui-option-group', className)}
      />
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
