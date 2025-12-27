import { Shape, Theme, Variant } from '@/functions/types'
import clsx from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'anchor-button'
type Props = Omit<ComponentPropsWithoutRef<'a'>, 'prefix'> & {
  theme?: Theme
  variant?: Variant
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
