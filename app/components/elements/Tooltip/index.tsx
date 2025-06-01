import { useDisclosure } from '@/functions/hooks/useDisclosure'
import * as RowTooltip from '@radix-ui/react-tooltip'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'tooltip'
type Props = {} & RowTooltip.TooltipContentProps
type Ref = ElementRef<'div'>

export const Tooltip = forwardRef<Ref, Props>(
  ({ children, content, className, ...props }) => {
    const tooltip = useDisclosure()
    return (
      <RowTooltip.Provider delayDuration={100}>
        <RowTooltip.Root open={tooltip.isOpen} onOpenChange={tooltip.setIsOpen}>
          <RowTooltip.Trigger asChild>{children}</RowTooltip.Trigger>
          <RowTooltip.Portal>
            <RowTooltip.Content
              className={clsx(styles[`${BLOCK_NAME}-content`], className)}
              sideOffset={5}
              {...props}
            >
              {content}
              <RowTooltip.Arrow className={styles[`${BLOCK_NAME}-arrow`]} />
            </RowTooltip.Content>
          </RowTooltip.Portal>
        </RowTooltip.Root>
      </RowTooltip.Provider>
    )
  },
)

Tooltip.displayName = 'Tooltip'
