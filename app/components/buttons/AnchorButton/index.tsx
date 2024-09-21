import clsx from 'clsx'
import {
  ElementRef,
  forwardRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react'
import NextLink, { LinkProps } from 'next/link'
import { Theme, Variant, Size, Shape } from '@/functions/types'
import styles from './index.module.scss'

const BLOCK_NAME = 'button'
type Props = Omit<ComponentPropsWithoutRef<'a'>, 'prefix'> & {
  theme?: Theme
  variant?: Variant
  size?: Size
  shape?: Shape
  disabled?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
} & LinkProps
type Ref = ElementRef<'a'>
export const AnchorButton = forwardRef<Ref, Props>(
  (
    {
      children,
      theme = 'primary',
      variant = 'contained',
      size = 'medium',
      shape,
      disabled,
      className,
      prefix,
      suffix,
      ...props
    },
    ref,
  ) => {
    return (
      <NextLink
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        data-variant={variant}
        data-theme={theme}
        data-size={size}
        data-shape={shape}
        aria-disabled={disabled}
        ref={ref}
      >
        {prefix ?? null}
        {children}
        {suffix ?? null}
      </NextLink>
    )
  },
)

AnchorButton.displayName = 'AnchorButton'
