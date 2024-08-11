/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import { ElementRef, forwardRef, ComponentPropsWithoutRef } from 'react'
import styles from './index.module.scss'

const BLOCK_NAME = 'icon-button'
type Props = {
  theme?: 'primary' | 'secondary' | 'danger'
  variant?: 'contained' | 'outlined' | 'text'
  size?: 'small' | 'medium' | 'large'
  shape?: 'rounded' | 'circle'
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
      size = 'medium',
      shape,
      loading,
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
        data-size={size}
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
