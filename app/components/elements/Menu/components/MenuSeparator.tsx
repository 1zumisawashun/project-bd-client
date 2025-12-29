import { Menu } from '@base-ui/react/menu'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from '../index.module.css'

const BLOCK_NAME = 'menu-separator'

type MenuSeparatorProps = ComponentProps<typeof Menu.Separator>

type CustomProps = { className?: string }

type Props = MenuSeparatorProps & CustomProps

type Ref = ElementRef<'div'>

export const MenuSeparator = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <Menu.Separator
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
      />
    )
  },
)

MenuSeparator.displayName = 'MenuSeparator'
