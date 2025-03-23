import * as RowToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.scss'

const BLOCK_NAME = 'toggle-group'
type Props = RowToggleGroup.ToggleGroupItemProps
type Ref = ElementRef<'button'>
export const ToggleGroupItem = forwardRef<Ref, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <RowToggleGroup.Item
        className={clsx(styles[`${BLOCK_NAME}-item`], className)}
        ref={ref}
        {...props}
      >
        {children}
      </RowToggleGroup.Item>
    )
  },
)

ToggleGroupItem.displayName = 'ToggleGroupItem'
