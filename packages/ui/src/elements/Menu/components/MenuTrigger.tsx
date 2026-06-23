import { Menu } from '@base-ui/react/menu'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menu-trigger'

type MenuTriggerProps = ComponentProps<typeof Menu.Trigger>

type CustomProps = { className?: string }

type Props = MenuTriggerProps & CustomProps

type Ref = ElementRef<'button'>

export const MenuTrigger = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Menu.Trigger
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
      />
    )
  },
)

MenuTrigger.displayName = 'MenuTrigger'
