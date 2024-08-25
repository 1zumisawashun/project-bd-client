import clsx from 'clsx'
import * as RowTabs from '@radix-ui/react-tabs'
import { forwardRef, ElementRef } from 'react'
import styles from '../index.module.scss'

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
