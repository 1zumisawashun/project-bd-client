import clsx from 'clsx'
import * as RowTabs from '@radix-ui/react-tabs'
import { forwardRef, ElementRef } from 'react'
import styles from '../index.module.scss'

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
