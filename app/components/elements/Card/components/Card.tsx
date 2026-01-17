import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Shape, Theme } from '@/functions/types'
import styles from '../index.module.css'

const BLOCK_NAME = 'card'

type CardProps = ComponentPropsWithoutRef<'div'>

type CustomProps = {
  theme?: Theme
  scrollable?: boolean
  hasBorder?: boolean
  shape?: Shape
}

type Props = CardProps & CustomProps

type Ref = ElementRef<'div'>

export const Card = forwardRef<Ref, Props>(
  (
    {
      // native props
      className,
      // custom props
      theme = 'transparent',
      scrollable = false,
      hasBorder = true,
      shape,
      // other props
      ...props
    },
    ref,
  ) => {
    return (
      <div
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
        data-variant="filled"
        data-theme={theme}
        data-scroll={scrollable}
        data-border={hasBorder}
        data-shape={shape}
      />
    )
  },
)

Card.displayName = 'Card'
