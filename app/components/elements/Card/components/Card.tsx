import { Shape, Theme } from '@/functions/types'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'card'
type Props = ComponentPropsWithoutRef<'div'> & {
  theme?: Theme
  scrollable?: boolean
  hasBorder?: boolean
  shape?: Shape
}
type Ref = ElementRef<'div'>
export const Card = forwardRef<Ref, Props>(
  (
    {
      theme = 'transparent',
      shape,
      scrollable = false,
      hasBorder = true,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        data-theme={theme}
        data-scroll={scrollable}
        data-border={hasBorder}
        data-shape={shape}
        ref={ref}
        {...props}
      />
    )
  },
)

Card.displayName = 'Card'
