import { useRef, useEffect } from 'react'
import { useDisclosure } from '@/functions/hooks/useDisclosure'

export const useToast = () => {
  const { isOpen, setIsOpen, open, close } = useDisclosure()
  const eventDateRef = useRef(new Date())
  const timerRef = useRef(0)

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  function oneWeekAway() {
    const now = new Date()
    const inOneWeek = now.setDate(now.getDate() + 7)
    return new Date(inOneWeek)
  }

  const handleClick = () => {
    close()
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      eventDateRef.current = oneWeekAway()
      open()
    }, 100)
  }

  return { isOpen, setIsOpen, handleClick }
}
