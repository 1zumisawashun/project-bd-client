import clsx from 'clsx'
import { ElementRef, forwardRef, ComponentPropsWithoutRef } from 'react'
import NextLink, { LinkProps } from 'next/link'
import styles from './index.module.scss'

const BLOCK_NAME = 'icon-button'
type Props = ComponentPropsWithoutRef<'a'> & {
  theme?: 'primary' | 'secondary' | 'danger'
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  shape?: 'rounded' | 'circle'
  disabled?: boolean
} & LinkProps
type Ref = ElementRef<'a'>
export const IconAnchorButton = forwardRef<Ref, Props>(
  (
    {
      children,
      theme = 'primary',
      variant = 'contained',
      size = 'medium',
      shape,
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
        data-size={size}
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
