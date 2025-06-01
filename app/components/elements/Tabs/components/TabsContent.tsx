import * as RowTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'tabs'
type Props = {} & RowTabs.TabsContentProps
type Ref = ElementRef<'div'>
export const TabsContent = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowTabs.TabsContent
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-content`], className)}
      />
    )
  },
)

TabsContent.displayName = 'TabsContent'
