import { Menu as RowMenu } from '@base-ui/react/menu'
import clsx from 'clsx'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { ArrowSvg } from '../../Icon'
import styles from '../index.module.css'

const BLOCK_NAME = 'menu'

type MenuProps = ComponentProps<typeof RowMenu.Positioner>

type CustomProps = {}

type Props = MenuProps & CustomProps

type Ref = ElementRef<'div'>

export const MenuList = forwardRef<Ref, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <RowMenu.Portal>
        <RowMenu.Positioner
          {...props}
          className={clsx(styles[`${BLOCK_NAME}`], className)}
          ref={ref}
          sideOffset={8}
        >
          <RowMenu.Popup className={styles[`${BLOCK_NAME}-popup`]!}>
            <RowMenu.Arrow className={styles[`${BLOCK_NAME}-arrow`]!}>
              <ArrowSvg />
            </RowMenu.Arrow>
            {children}
          </RowMenu.Popup>
        </RowMenu.Positioner>
      </RowMenu.Portal>
    )
  },
)

MenuList.displayName = 'MenuList'
