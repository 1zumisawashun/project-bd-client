import * as RowTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tabs'
type Props = {} & RowTabs.TabsProps
type Ref = ElementRef<'div'>
export const Tabs = forwardRef<Ref, Props>(({ className, ...props }, ref) => {
  return (
    <RowTabs.Root
      {...props}
      ref={ref}
      className={clsx(styles[`${BLOCK_NAME}`], className)}
    />
  )
})

Tabs.displayName = 'Tabs'
