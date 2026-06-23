'use client'

import { useCallback, useState } from 'react'

export const useDisclosure = (initial = false) => {
  const [_isOpen, _setIsOpen] = useState(initial)

  const open = useCallback(() => _setIsOpen(true), [])
  const close = useCallback(() => _setIsOpen(false), [])
  const toggle = useCallback(() => _setIsOpen((state) => !state), [])
  const setIsOpen = useCallback((state: boolean) => _setIsOpen(state), [])

  return { isOpen: _isOpen, setIsOpen, open, close, toggle }
}
