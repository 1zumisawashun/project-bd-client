import { Tooltip as RowTooltip } from '@base-ui/react/tooltip'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tooltip-trigger'

type TooltipTriggerProps = ComponentProps<typeof RowTooltip.Trigger>

type CustomProps = { className?: string }

type Props = TooltipTriggerProps & CustomProps

type Ref = ElementRef<'button'>

export const TooltipTrigger = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowTooltip.Trigger
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
      />
    )
  },
)

TooltipTrigger.displayName = 'TooltipTrigger'
