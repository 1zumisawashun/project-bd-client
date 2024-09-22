import { useState, ChangeEvent, ElementRef, useRef, KeyboardEvent } from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { TextInput } from '../../TextInput'

type Ref = ElementRef<'input'>
type Props = {
  onChange: (value: string) => void // react-hook-form's onChange
  rows: string[]
}

export const AutocompleteInputGroup: React.FC<Props> = ({ onChange, rows }) => {
  const { isOpen, open, close } = useDisclosure()

  const referenceRef = useRef<ElementRef<'div'>>(null)
  const inputRef = useRef<Ref>(null!)

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isPending, setIsPending] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<Ref>) => {
    const { value } = e.target

    if (value.length > 0) {
      setSuggestions(rows.filter((d) => d.startsWith(value)))
      open()
    } else {
      setSuggestions(rows.filter((d) => d.startsWith(value)))
      close()
    }
  }

  const handleFocus = () => {
    setSuggestions(rows)
    open()
  }

  const reset = () => {
    inputRef.current.value = ''
  }

  const handleClick = (value: string) => {
    setSuggestions(rows.filter((d) => d.startsWith(value)))
    onChange(value)
    reset()
  }

  const handleKeydown = (e: KeyboardEvent<Ref>) => {
    if (!isPending && e.key === 'Enter') {
      e.preventDefault()
      const { value } = e.target as HTMLInputElement

      if (!value) {
        close()
        return
      }

      setSuggestions(rows.filter((d) => d.startsWith(value)))
      onChange(value)
      reset()
    }
  }

  useOuterClick([referenceRef], () => {
    close()
  })

  return (
    <Menu isOpen={isOpen} open={open} close={close}>
      <div ref={referenceRef}>
        <TextInput
          type="text"
          autoComplete="off"
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeydown}
          onCompositionStart={() => setIsPending(true)}
          onCompositionEnd={() => setIsPending(false)}
          ref={inputRef}
        />
      </div>

      <MenuContent>
        {suggestions.map((d) => (
          <MenuItem key={d} onClick={() => handleClick(d)}>
            {d}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  )
}
