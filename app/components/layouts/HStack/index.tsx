import { Align, Justify } from '@/functions/types'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

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
