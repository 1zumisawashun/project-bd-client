import { Tabs as RowTabs } from '@base-ui/react/tabs'
import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tabs-tab'

type TabsTabProps = ComponentProps<typeof RowTabs.Tab>

type CustomProps = {}

type Props = TabsTabProps & CustomProps

// NOTE: I/F が element の場合、 base-ui は render 前提で考えている気がする
type Ref = Element

export const TabsTab = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowTabs.Tab
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

TabsTab.displayName = 'TabsTab'
