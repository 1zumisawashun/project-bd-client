'use client'

import { Toast } from '@/functions/types'
import { createContext } from 'react'

export type ToastDispatchContextParams = Omit<Toast, 'id' | 'isOpen'>
export const ToastDispatchContext = createContext<
  (params: ToastDispatchContextParams) => void
>(() => null)

export const ToastDispatchProvider = ToastDispatchContext.Provider
