import { Tabs as RowTabs } from '@base-ui/react/tabs'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tabs-list'

type TabsListProps = ComponentProps<typeof RowTabs.List>

type CustomProps = {}

type Props = TabsListProps & CustomProps

type Ref = ElementRef<'div'>

export const TabsList = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowTabs.List
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

TabsList.displayName = 'TabsList'
