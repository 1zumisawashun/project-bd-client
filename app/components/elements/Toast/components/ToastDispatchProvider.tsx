import { createContext } from 'react'
import { Toast } from '../../elements.type'

export type ToastDispatchContextParams = Omit<Toast, 'id' | 'isOpen'>
export const ToastDispatchContext = createContext<
  (params: ToastDispatchContextParams) => void
>(() => null)

export const ToastDispatchProvider = ToastDispatchContext.Provider
