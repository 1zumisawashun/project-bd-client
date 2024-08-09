import clsx from 'clsx'
import {
  ElementRef,
  forwardRef,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react'
import NextLink, { LinkProps } from 'next/link'
import styles from './index.module.scss'

type Props = ComponentPropsWithoutRef<'a'> & {
  theme?: 'primary' | 'secondary' | 'danger'
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  shape?: 'rounded' | 'circle'
  disabled?: boolean
  className?: string
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
        className={clsx(styles['button'], className)}
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
