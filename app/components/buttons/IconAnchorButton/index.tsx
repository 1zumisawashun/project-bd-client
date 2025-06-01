import { Shape, Theme, Variant } from '@/functions/types'
import clsx from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'icon-button'
type Props = ComponentPropsWithoutRef<'a'> & {
  theme?: Theme
  variant?: Variant
  shape?: Shape
  disabled?: boolean
} & LinkProps
type Ref = ElementRef<'a'>
export const IconAnchorButton = forwardRef<Ref, Props>(
  (
    {
      children,
      theme = 'primary',
      variant = 'contained',
      shape = 'rounded',
      disabled,
      className,
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
        {children}
      </NextLink>
    )
  },
)

IconAnchorButton.displayName = 'IconAnchorButton'
