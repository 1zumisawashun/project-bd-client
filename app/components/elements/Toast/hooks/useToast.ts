'use client'

import { useState, useCallback } from 'react'
import { genRandomId } from '@/functions/helpers/utils'
import { ToastDispatchContextParams } from '../components/ToastDispatchProvider'
import { Toast } from '../../elements.type'

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const openToast = useCallback((params: ToastDispatchContextParams) => {
    const id = genRandomId()
    setToasts((prev) => [...prev, { id, isOpen: true, ...params }])
  }, [])

  const closeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isOpen: false } : d)),
    )
  }, [])

  return { toasts, openToast, closeToast }
}
