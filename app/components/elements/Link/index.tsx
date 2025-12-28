import clsx from 'clsx'
import NextLink, { LinkProps as RowLinkProps } from 'next/link'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'link'

type LinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'prefix'> & RowLinkProps

type CustomProps = {
  disabled?: boolean
  isExternal?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

type Props = LinkProps & CustomProps

type Ref = ElementRef<'a'>

export const Link = forwardRef<Ref, Props>(
  (
    {
      // custom props
      disabled = false,
      isExternal = false,
      prefix,
      suffix,
      // native props
      children,
      className,
      // other props
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
        // native props
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
        // custom props
        aria-disabled={disabled}
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
