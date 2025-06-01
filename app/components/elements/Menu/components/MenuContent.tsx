import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { useMenu } from '../hooks/useMenu'
import styles from '../index.module.css'

const BLOCK_NAME = 'menu'
type Ref = ElementRef<'div'>
type Props = {} & ComponentPropsWithoutRef<'div'>
export const MenuContent = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    const menu = useMenu()

    if (!menu?.isOpen) return null

    return (
      <div
        className={clsx(styles[`${BLOCK_NAME}-content`], className)}
        {...props}
        ref={ref}
      />
    )
  },
)

MenuContent.displayName = 'MenuContent'
