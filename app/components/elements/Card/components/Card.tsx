import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import clsx from 'clsx'
import { Shape, Theme } from '@/functions/types'
import styles from '../index.module.scss'

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
