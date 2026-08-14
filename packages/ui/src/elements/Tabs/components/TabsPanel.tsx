import { Tabs as RowTabs } from '@base-ui/react/tabs'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tabs-panel'

type TabsPanelProps = ComponentProps<typeof RowTabs.Panel>

type CustomProps = {}

type Props = TabsPanelProps & CustomProps

type Ref = ElementRef<'div'>

export const TabsPanel = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowTabs.Panel
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

TabsPanel.displayName = 'TabsPanel'
