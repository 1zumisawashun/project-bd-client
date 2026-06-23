import { Toggle as RowToggle } from '@base-ui/react/toggle'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'toggle'

type ToggleProps = ComponentProps<typeof RowToggle>

type CustomProps = {}

type Props = ToggleProps & CustomProps

type Ref = ElementRef<'button'>

export const Toggle = forwardRef<Ref, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <RowToggle
        {...props}
        // native props
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
      >
        {children}
      </RowToggle>
    )
  },
)

Toggle.displayName = 'Toggle'
