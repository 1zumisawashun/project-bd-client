import { Tooltip as RowTooltip } from '@base-ui/react/tooltip'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { ArrowSvg } from '../../Icon'
import styles from '../index.module.css'

const BLOCK_NAME = 'tooltip'

type TooltipContentProps = ComponentProps<typeof RowTooltip.Positioner>

type CustomProps = {}

type Props = TooltipContentProps & CustomProps

type Ref = ElementRef<'div'>

export const TooltipContent = forwardRef<Ref, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <RowTooltip.Portal>
        <RowTooltip.Positioner
          {...props}
          className={clsx(styles[`${BLOCK_NAME}`], className)}
          ref={ref}
          sideOffset={10}
        >
          <RowTooltip.Popup className={styles[`${BLOCK_NAME}-popup`]!}>
            <RowTooltip.Arrow className={styles[`${BLOCK_NAME}-arrow`]!}>
              <ArrowSvg />
            </RowTooltip.Arrow>
            {children}
          </RowTooltip.Popup>
        </RowTooltip.Positioner>
      </RowTooltip.Portal>
    )
  },
)

TooltipContent.displayName = 'TooltipContent'
