import { IconAnchorButton } from '@/components/buttons/IconAnchorButton'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'breadcrumb'

type BreadcrumbProps = ComponentPropsWithoutRef<'nav'>

type CustomProps = { href?: string }

type Props = BreadcrumbProps & CustomProps

type Ref = ElementRef<'nav'>

/**
 * NOTE:
 * @see https://developer.mozilla.org/ja/docs/Web/CSS/Layout_cookbook/Breadcrumb_Navigation
 */
export const Breadcrumb = forwardRef<Ref, Props>(
  (
    {
      // native props
      children,
      className,
      // custom props
      href,
      // other props
      ...props
    },
    ref,
  ) => {
    return (
      <nav
        {...props}
        aria-label="breadcrumb"
        className={clsx(styles[`${BLOCK_NAME}-nav`], className)}
        ref={ref}
      >
        {href && (
          <IconAnchorButton
            href={href}
            variant="ghost"
            className={styles[`${BLOCK_NAME}-back-button`]!}
          >
            <ChevronLeftIcon />
          </IconAnchorButton>
        )}
        <ul className={styles[`${BLOCK_NAME}`]}>{children}</ul>
      </nav>
    )
  },
)

Breadcrumb.displayName = 'Breadcrumb'
