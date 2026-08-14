import { CheckboxGroup as RowCheckboxGroup } from '@base-ui/react/checkbox-group'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'

type CheckboxGroupProps = ComponentProps<typeof RowCheckboxGroup>

type CustomProps = {}

type Props = CheckboxGroupProps & CustomProps

type Ref = ElementRef<'div'>

export const CheckboxGroup = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowCheckboxGroup
        {...props}
        // native props
        ref={ref}
        className={clsx('ui-option-group', className)}
      />
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'
