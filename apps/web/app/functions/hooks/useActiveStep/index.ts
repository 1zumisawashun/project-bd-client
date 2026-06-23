'use client'

import { useCallback, useState } from 'react'

export const useActiveStep = (initial = 0) => {
  const [activeStep, setActiveStep] = useState(initial)

  const back = useCallback(() => setActiveStep((prev) => prev - 1), [])
  const next = useCallback(() => setActiveStep((prev) => prev + 1), [])
  const reset = useCallback(() => setActiveStep(0), [])

  return { step: activeStep, back, next, reset }
}
