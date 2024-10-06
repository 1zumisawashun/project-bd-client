'use client'

import {
  createContext,
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
} from 'react'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import styles from '../index.module.scss'

const BLOCK_NAME = 'menu'
type MenuContextParams = Omit<
  ReturnType<typeof useDisclosure>,
  'setIsOpen' | 'toggle'
>
export const MenuContext = createContext<MenuContextParams | undefined>(
  undefined,
)

const MenuProvider = MenuContext.Provider
type Props = MenuContextParams & ComponentPropsWithoutRef<'div'>
type Ref = ElementRef<'div'>

export const Menu = forwardRef<Ref, Props>(
  ({ isOpen, open, close, ...rest }, ref) => {
    return (
      <MenuProvider value={{ isOpen, open, close }}>
        <div className={styles[`${BLOCK_NAME}`]} {...rest} ref={ref} />
      </MenuProvider>
    )
  },
)

Menu.displayName = 'Menu'
