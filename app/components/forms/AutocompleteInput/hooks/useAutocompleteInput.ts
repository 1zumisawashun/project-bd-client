import { useState, ChangeEvent, ElementRef, KeyboardEvent } from 'react'
import { useDisclosure } from '@/functions/hooks/useDisclosure'

type Props = {
  options: string[]
  value: string | number | readonly string[] | undefined
}
type Ref = ElementRef<'input'>
export const useAutocompleteInput = (props: Props) => {
  const menu = useDisclosure()

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isPending, setIsPending] = useState<boolean>(false)
  const [isFirstFocus, setIsFirstFocus] = useState<boolean>(true)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setSuggestions(props.options.filter((d) => d.startsWith(value)))

    if (value.length > 0) {
      menu.open()
    } else {
      menu.close()
    }
  }

  const onFocus = () => {
    if (isFirstFocus) {
      setIsFirstFocus(false)
      setSuggestions(props.options)
    }
    menu.open()
  }

  const onClick = () => {
    setSuggestions([])
    menu.close()
  }

  // カリー化でeを隠蔽してもいいかも
  const onKeyDown = (e: KeyboardEvent<Ref>, cb: (value: string) => void) => {
    if (!isPending && e.key === 'Enter') {
      e.preventDefault()
      const { value } = e.target as Ref

      // 未入力の場合はメニューを閉じる
      if (!value) {
        menu.close()
        return
      }
      setSuggestions(props.options.filter((d) => d.startsWith(value)))
      cb(value)
    }
  }

  const onCompositionStart = () => {
    setIsPending(true)
  }
  const onCompositionEnd = () => {
    setIsPending(false)
  }

  return {
    menu,
    suggestions: suggestions.filter((d) => d !== props.value),
    onChange,
    onClick,
    onKeyDown,
    onFocus,
    onCompositionStart,
    onCompositionEnd,
  }
}
