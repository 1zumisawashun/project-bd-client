import { Shape, Theme, Variant } from '@/functions/types'
import { Button as RowButton, type ButtonProps } from '@base-ui/react/button'
import clsx from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import { ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'icon-button'

// NOTE: ButtonPropsからButtonNonNativePropsの部分だけを抽出する
type ButtonNonNativeProps = Extract<ButtonProps, { nativeButton: false }>

type CustomProps = {
  theme?: Theme
  variant?: Variant
  shape?: Shape
}

type Props = LinkProps &
  Omit<ButtonNonNativeProps, 'prefix' | 'nativeButton'> &
  CustomProps

type Ref = ElementRef<'button'>

export const IconAnchorButton = forwardRef<Ref, Props>(
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
      // other props
      ...props
    },
    ref,
  ) => {
    return (
      <RowButton
        {...props}
        // base-ui props
        nativeButton={false}
        render={<NextLink href={props.href} />}
        // native props
        className={clsx(styles[`${BLOCK_NAME}`], className)}
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

IconAnchorButton.displayName = 'IconAnchorButton'
