import { Button as RowButton } from '@base-ui/react/button'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { Shape, Theme, Variant } from '@/functions/types'
import styles from './index.module.css'

const BLOCK_NAME = 'icon-button'

// NOTE: ButtonPropsからButtonNativePropsの部分だけを抽出する
type ButtonNativeProps = Extract<
  ComponentProps<typeof RowButton>,
  { nativeButton?: true }
>

type CustomProps = {
  theme?: Theme
  variant?: Variant
  shape?: Shape
}

type Props = ButtonNativeProps & CustomProps

type Ref = ElementRef<'button'>

export const IconButton = forwardRef<Ref, Props>(
  (
    {
      // custom props
      theme = 'primary',
      variant = 'contained',
      shape = 'rounded',
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
        {children}
      </RowButton>
    )
  },
)

IconButton.displayName = 'IconButton'
