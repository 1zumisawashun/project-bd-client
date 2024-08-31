import { useContext } from 'react'
import { ToastDispatchContext } from '../components/ToastDispatchProvider'

export const useToastDispatch = () => {
  return useContext(ToastDispatchContext)
}
