import { ToggleGroup as RowToggleGroup } from '@base-ui/react/toggle-group'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'toggle-group'

type ToggleGroupProps = ComponentProps<typeof RowToggleGroup>

type CustomProps = {}

type Props = ToggleGroupProps & CustomProps

type Ref = ElementRef<'div'>

export const ToggleGroup = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowToggleGroup
        {...props}
        // native props
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
      />
    )
  },
)

ToggleGroup.displayName = 'ToggleGroup'
