import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { AnchorButton } from '@/components/buttons/AnchorButton'
import styles from '../index.module.scss'

const BLOCK_NAME = 'breadcrumb'
type Props = { href?: string } & ComponentPropsWithoutRef<'nav'>
type Ref = ElementRef<'nav'>
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
