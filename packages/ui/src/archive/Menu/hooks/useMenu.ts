import { useContext } from 'react'
import { MenuContext } from '../components/Menu'

export const useMenu = () => {
  return useContext(MenuContext)
}
