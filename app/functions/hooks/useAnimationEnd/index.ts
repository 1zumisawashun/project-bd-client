'use client'

import { RefObject, useCallback, useEffect } from 'react'

export const useAnimationEnd = (
  ref: RefObject<HTMLElement>,
  cb: (e: AnimationEvent) => void,
) => {
  const handleAnimationEnd = useCallback(
    (e: AnimationEvent) => {
      cb(e)
    },
    [cb],
  )

  useEffect(() => {
    const target = ref.current
    target?.addEventListener('animationend', handleAnimationEnd, false)

    return () =>
      target?.removeEventListener('animationend', handleAnimationEnd, false)
  }, [ref, handleAnimationEnd])
}
