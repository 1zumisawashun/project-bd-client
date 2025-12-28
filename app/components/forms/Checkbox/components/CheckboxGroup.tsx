import { CheckboxGroup as RowCheckboxGroup } from '@base-ui/react/checkbox-group'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'checkbox-group'

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
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'
