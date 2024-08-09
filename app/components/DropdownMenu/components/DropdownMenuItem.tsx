/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import clsx from 'clsx'
import * as RowDropdownMenu from '@radix-ui/react-dropdown-menu'
import { forwardRef, ElementRef } from 'react'
import styles from '../index.module.scss'

const BLOCK_NAME = 'dropdown-menu'
type Props = {} & RowDropdownMenu.DropdownMenuItemProps
type Ref = ElementRef<'div'>
export const DropdownMenuItem = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowDropdownMenu.Item
        {...props}
        ref={ref}
        className={clsx(styles[`${BLOCK_NAME}-item`], className)}
      />
    )
  },
)

DropdownMenuItem.displayName = 'DropdownMenuItem'
