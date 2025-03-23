import * as RowToggleGroup from '@radix-ui/react-toggle-group'
import clsx from 'clsx'
import { ElementRef, forwardRef } from 'react'
import styles from '../index.module.scss'

const BLOCK_NAME = 'toggle-group'
// NOTE: 単一選択のみ許容する
type Props = {} & Omit<RowToggleGroup.ToggleGroupSingleProps, 'type'>
type Ref = ElementRef<'div'>
export const ToggleGroup = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowToggleGroup.Root
        type="single"
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
      />
    )
  },
)

ToggleGroup.displayName = 'ToggleGroup'
