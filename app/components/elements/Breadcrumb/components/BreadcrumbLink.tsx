import clsx from 'clsx'
import { forwardRef, ElementRef, ComponentProps } from 'react'
import { AnchorButton } from '@/components/buttons/AnchorButton'
import styles from '../index.module.scss'

const BLOCK_NAME = 'breadcrumb'
type Props = { isCurrent?: boolean } & ComponentProps<typeof AnchorButton>
type Ref = ElementRef<'a'>
/** @see https://developer.mozilla.org/ja/docs/Web/CSS/Layout_cookbook/Breadcrumb_Navigation */
export const BreadcrumbLink = forwardRef<Ref, Props>(
  ({ isCurrent, className, ...props }, ref) => {
    return (
      <li className={styles[`${BLOCK_NAME}-item`]} aria-current={isCurrent}>
        <AnchorButton
          variant="ghost"
          className={clsx(styles[`${BLOCK_NAME}-link`], className)}
          aria-current={isCurrent}
          {...props}
          ref={ref}
        />
      </li>
    )
  },
)

BreadcrumbLink.displayName = 'BreadcrumbLink'
