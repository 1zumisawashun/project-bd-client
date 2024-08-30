import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import styles from './index.module.scss'
import { Align } from '../elements.type'

const BLOCK_NAME = 'hstack'
type Props = { gap?: number; align?: Align } & ComponentPropsWithoutRef<'div'>
type Ref = ElementRef<'div'>
export const HStack = forwardRef<Ref, Props>(
  ({ className, gap = 4, align, ...props }, ref) => {
    return (
      <div
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        data-gap={gap}
        data-align={align}
        {...props}
        ref={ref}
      />
    )
  },
)

HStack.displayName = 'HStack'
