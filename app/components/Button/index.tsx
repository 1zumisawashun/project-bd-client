/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  theme?: 'primary' | 'secondary' | 'tertiary'
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  shape?: 'rounded' | 'circle'
  loading?: boolean
  disabled?: boolean
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
} & ComponentProps<'button'>

type Ref = ElementRef<'button'>

export const Button = forwardRef<Ref, Props>(
  (
    {
      type = 'button',
      children,
      theme = 'primary',
      variant = 'contained',
      size = 'medium',
      shape,
      loading,
      disabled,
      className,
      prefix,
      suffix,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        type={type}
        className={clsx(styles['Button'], className)}
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
      </button>
    )
  },
)

Button.displayName = 'Button'
