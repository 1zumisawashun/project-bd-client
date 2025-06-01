import { AnchorButton } from '@/components/buttons/AnchorButton'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'breadcrumb'
type Props = { href?: string } & ComponentPropsWithoutRef<'nav'>
type Ref = ElementRef<'nav'>

/** @see https://developer.mozilla.org/ja/docs/Web/CSS/Layout_cookbook/Breadcrumb_Navigation */
export const Breadcrumb = forwardRef<Ref, Props>(
  ({ children, className, href, ...props }, ref) => {
    return (
      <nav
        aria-label="breadcrumb"
        className={clsx(styles[`${BLOCK_NAME}-nav`], className)}
        {...props}
        ref={ref}
      >
        {href ? (
          <AnchorButton
            href={href}
            variant="ghost"
            className={styles[`${BLOCK_NAME}-back-button`]}
          >
            <ChevronLeftIcon />
          </AnchorButton>
        ) : null}
        <ul className={styles[`${BLOCK_NAME}`]}>{children}</ul>
      </nav>
    )
  },
)

Breadcrumb.displayName = 'Breadcrumb'
