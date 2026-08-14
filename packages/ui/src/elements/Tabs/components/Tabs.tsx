import { Tabs as RowTabs } from '@base-ui/react/tabs'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tabs'

type TabsProps = ComponentProps<typeof RowTabs.Root>

type CustomProps = {}

type Props = TabsProps & CustomProps

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
