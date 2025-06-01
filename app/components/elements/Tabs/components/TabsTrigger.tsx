import * as RowTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tabs'
type Props = {} & RowTabs.TabsTriggerProps
type Ref = ElementRef<'button'>
export const TabsTrigger = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowTabs.TabsTrigger
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-trigger`], className)}
      />
    )
  },
)

TabsTrigger.displayName = 'TabsTrigger'
