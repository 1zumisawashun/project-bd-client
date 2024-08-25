import clsx from 'clsx'
import * as RowTabs from '@radix-ui/react-tabs'
import { forwardRef, ElementRef } from 'react'
import styles from '../index.module.scss'

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
