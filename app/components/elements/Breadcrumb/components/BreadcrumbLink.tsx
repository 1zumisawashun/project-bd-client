import { AnchorButton } from '@/components/buttons/AnchorButton'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'breadcrumb-link'

type BreadcrumbLinkProps = ComponentProps<typeof AnchorButton>

type CustomProps = { isCurrent?: boolean }

type Props = BreadcrumbLinkProps & CustomProps

type Ref = ElementRef<'button'>

/**
 * NOTE:
 * @see https://developer.mozilla.org/ja/docs/Web/CSS/Layout_cookbook/Breadcrumb_Navigation
 */
export const BreadcrumbLink = forwardRef<Ref, Props>(
  (
    {
      // native props
      className,
      // custom props
      isCurrent,
      // other props
      ...props
    },
    ref,
  ) => {
    return (
      <li className={styles[`${BLOCK_NAME}-item`]} aria-current={isCurrent}>
        <AnchorButton
          variant="ghost"
          className={clsx(styles[`${BLOCK_NAME}`], className)}
          aria-current={isCurrent}
          {...props}
          ref={ref}
        />
      </li>
    )
  },
)

BreadcrumbLink.displayName = 'BreadcrumbLink'
