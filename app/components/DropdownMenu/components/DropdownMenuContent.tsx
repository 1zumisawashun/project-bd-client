/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import * as RowDropdownMenu from '@radix-ui/react-dropdown-menu'
import { forwardRef, ElementRef } from 'react'
import styles from '../index.module.scss'

const BLOCK_NAME = 'dropdown-menu'
type Props = {} & RowDropdownMenu.DropdownMenuContentProps
type Ref = ElementRef<'div'>
export const DropdownMenuContent = forwardRef<Ref, Props>(
  ({ children, className, ...props }, ref) => {
    return (
      <RowDropdownMenu.Portal>
        <RowDropdownMenu.Content
          {...props}
          ref={ref}
          className={clsx(styles[`${BLOCK_NAME}-content`], className)}
        >
          {children}
          <RowDropdownMenu.Arrow className={styles[`${BLOCK_NAME}-arrow`]} />
        </RowDropdownMenu.Content>
      </RowDropdownMenu.Portal>
    )
  },
)

DropdownMenuContent.displayName = 'DropdownMenuContent'
