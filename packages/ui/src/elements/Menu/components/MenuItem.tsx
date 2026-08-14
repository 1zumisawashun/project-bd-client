import { Menu } from '@base-ui/react/menu'
import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menu-item'

type MenuItemProps = ComponentProps<typeof Menu.Item>

type CustomProps = { className?: string }

type Props = MenuItemProps & CustomProps

type Ref = Element

export const MenuItem = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Menu.Item
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
      />
    )
  },
)

MenuItem.displayName = 'MenuItem'
