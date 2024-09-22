import clsx from 'clsx'
import { ElementRef, forwardRef, ComponentPropsWithoutRef } from 'react'
import styles from '../index.module.scss'
import { useMenu } from '../hooks/useMenu'

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
