import { useState, ChangeEvent, ElementRef, KeyboardEvent } from 'react'
import { useDisclosure } from '@/functions/hooks/useDisclosure'

type Ref = ElementRef<'input'>
export const useAutocompleteInput = ({ rows }: { rows: string[] }) => {
  const menu = useDisclosure()

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value.length > 0) {
      setSuggestions(rows.filter((d) => d.startsWith(value)))
      menu.open()
    } else {
      setSuggestions(rows.filter((d) => d.startsWith(value)))
      menu.close()
    }

    return value
  }

  const onFocus = () => {
    setSuggestions(rows)
    menu.open()
  }

  const handleClick = (value: string) => {
    setSuggestions(rows.filter((d) => d.startsWith(value)))
    return value
  }

  const handleKeydown = (e: KeyboardEvent<Ref>) => {
    if (!isPending && e.key === 'Enter') {
      e.preventDefault()
      const { value } = e.target as Ref

      // 未入力の場合はメニューを閉じる
      if (!value) {
        menu.close()
        return null
      }

      setSuggestions(rows.filter((d) => d.startsWith(value)))
      return value
    }
    return null
  }

  const onCompositionStart = () => {
    setIsPending(true)
  }
  const onCompositionEnd = () => {
    setIsPending(false)
  }

  return {
    menu,
    suggestions,
    handleChange,
    handleClick,
    handleKeydown,
    onFocus,
    onCompositionStart,
    onCompositionEnd,
  }
}
