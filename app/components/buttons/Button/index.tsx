import { Shape, Theme, Variant } from '@/functions/types'
import clsx from 'clsx'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react'
import styles from './index.module.scss'

const BLOCK_NAME = 'button'
type Props = {
  theme?: Theme
  variant?: Variant
  shape?: Shape
  loading?: boolean
  disabled?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
} & Omit<ComponentPropsWithoutRef<'button'>, 'prefix'>
type Ref = ElementRef<'button'>
export const Button = forwardRef<Ref, Props>(
  (
    {
      type = 'button',
      children,
      theme = 'primary',
      variant = 'contained',
      shape,
      // loading,
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
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        type={type}
        data-variant={variant}
        data-theme={theme}
        data-shape={shape}
        disabled={disabled}
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
