import clsx from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'link'
type Props = Omit<ComponentPropsWithoutRef<'a'>, 'prefix'> & {
  disabled?: boolean
  isExternal?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
} & LinkProps
type Ref = ElementRef<'a'>
export const Link = forwardRef<Ref, Props>(
  (
    {
      children,
      disabled = false,
      className,
      prefix,
      suffix,
      isExternal = false,
      ...props
    },
    ref,
  ) => {
    const externalProps = isExternal
      ? {
          target: '_blank',
          rel: 'noopener noreferrer',
        }
      : {}
    return (
      <NextLink
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        aria-disabled={disabled}
        ref={ref}
        {...externalProps}
      >
        {prefix ?? null}
        {children}
        {suffix ?? null}
      </NextLink>
    )
  },
)

Link.displayName = 'Link'
