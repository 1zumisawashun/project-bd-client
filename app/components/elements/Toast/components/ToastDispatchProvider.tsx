'use client'

import { createContext } from 'react'
import { Toast } from '@/functions/types'

export type ToastDispatchContextParams = Omit<Toast, 'id' | 'isOpen'>
export const ToastDispatchContext = createContext<
  (params: ToastDispatchContextParams) => void
>(() => null)

export const ToastDispatchProvider = ToastDispatchContext.Provider
