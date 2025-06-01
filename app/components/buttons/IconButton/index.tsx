import { Shape, Theme, Variant } from '@/functions/types'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'icon-button'
type Props = {
  theme?: Theme
  variant?: Variant
  shape?: Shape
  loading?: boolean
  disabled?: boolean
} & ComponentPropsWithoutRef<'button'>
type Ref = ElementRef<'button'>
export const IconButton = forwardRef<Ref, Props>(
  (
    {
      type = 'button',
      children,
      theme = 'primary',
      variant = 'contained',
      shape = 'rounded',
      // loading,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        type={type}
        data-variant={variant}
        data-theme={theme}
        data-shape={shape}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
