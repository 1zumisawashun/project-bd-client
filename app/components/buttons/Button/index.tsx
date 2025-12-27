import { Shape, Theme, Variant } from '@/functions/types'
import { Button as RowButton, type ButtonProps } from '@base-ui/react/button'
import clsx from 'clsx'
import { ElementRef, forwardRef, ReactNode } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'button'

// NOTE: ButtonPropsからButtonNativePropsの部分だけを抽出する
type ButtonNativeProps = Extract<ButtonProps, { nativeButton?: true }>

type CustomProps = {
  theme?: Theme
  variant?: Variant
  shape?: Shape
  prefix?: ReactNode
  suffix?: ReactNode
}

type Props = Omit<ButtonNativeProps, 'prefix'> & CustomProps

type Ref = ElementRef<'button'>

export const Button = forwardRef<Ref, Props>(
  (
    {
      // custom props
      theme = 'primary',
      variant = 'contained',
      shape = 'rounded',
      prefix,
      suffix,
      // native props
      children,
      disabled = false,
      className = undefined,
      type = 'button',
      // other props
      ...props
    },
    ref,
  ) => {
    return (
      <RowButton
        {...props}
        // base-ui props
        nativeButton={true}
        // native props
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        type={type}
        disabled={disabled}
        ref={ref}
        // custom props
        data-variant={variant}
        data-theme={theme}
        data-shape={shape}
      >
        {prefix ?? null}
        {children}
        {suffix ?? null}
      </RowButton>
    )
  },
)

Button.displayName = 'Button'
