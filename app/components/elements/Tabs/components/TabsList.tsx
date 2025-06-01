import * as RowTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tabs'
type Props = {} & RowTabs.TabsListProps
type Ref = ElementRef<'div'>
export const TabsList = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowTabs.TabsList
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-list`], className)}
      />
    )
  },
)

TabsList.displayName = 'TabsList'
