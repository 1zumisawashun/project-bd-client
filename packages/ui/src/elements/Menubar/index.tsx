import { Menubar as RowMenubar } from '@base-ui/react/menubar'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import styles from './index.module.css'

const BLOCK_NAME = 'menubar'

type MenubarProps = ComponentProps<typeof RowMenubar>

type CustomProps = {}

type Props = MenubarProps & CustomProps

type Ref = ElementRef<'div'>

export const Menubar = forwardRef<Ref, Props>(
  ({ className, ...props }, ref) => {
    return (
      <RowMenubar
        {...props}
        className={clsx(styles[`${BLOCK_NAME}`], className)}
        ref={ref}
      />
    )
  },
)

Menubar.displayName = 'Menubar'
