import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import { Align, Justify } from '@/functions/types'
import styles from './index.module.scss'

const BLOCK_NAME = 'hstack'
type Props = {
  gap?: number
  align?: Align
  justify?: Justify
} & ComponentPropsWithoutRef<'div'>
type Ref = ElementRef<'div'>
export const HStack = forwardRef<Ref, Props>(
  ({ className, gap = 4, align, justify, ...props }, ref) => {
    return (
      <div
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        data-gap={gap}
        data-align={align}
        data-justify={justify}
        {...props}
        ref={ref}
      />
    )
  },
)

HStack.displayName = 'HStack'
