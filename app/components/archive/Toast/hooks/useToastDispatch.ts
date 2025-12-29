import { useContext } from 'react'
import { ToastDispatchContext } from '../components/ToastDispatchProvider'

export const useToastDispatch = () => {
  const context = useContext(ToastDispatchContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}
