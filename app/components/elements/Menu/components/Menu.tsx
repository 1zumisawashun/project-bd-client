'use client'

import { createContext } from 'react'
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
type MenuProps = {
  children: React.ReactNode
} & MenuContextParams
export const Menu: React.FC<MenuProps> = ({
  children,
  isOpen,
  open,
  close,
}) => {
  return (
    <MenuProvider value={{ isOpen, open, close }}>
      <div className={styles[`${BLOCK_NAME}`]}>{children}</div>
    </MenuProvider>
  )
}
