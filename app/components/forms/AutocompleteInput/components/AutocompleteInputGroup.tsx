import { ElementRef, useRef, ComponentProps } from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import { TextInput } from '../../TextInput'
import { useAutocompleteInput } from '../hooks/useAutocompleteInput'

type Ref = ElementRef<'input'>
type Props = {
  onChange: (value: string) => void // react-hook-form's onChange
  rows: string[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>

export const AutocompleteInputGroup: React.FC<Props> = ({ onChange, rows }) => {
  const {
    menu,
    suggestions,
    handleChange,
    handleClick,
    handleKeydown,
    onFocus,
    onCompositionStart,
    onCompositionEnd,
  } = useAutocompleteInput({ rows })

  const referenceRef = useRef<ElementRef<'div'>>(null)
  const inputRef = useRef<Ref>(null!)

  const reset = () => {
    inputRef.current.value = ''
  }

  useOuterClick([referenceRef], () => {
    menu.close()
  })

  return (
    <Menu isOpen={menu.isOpen} open={menu.open} close={menu.close}>
      <div ref={referenceRef}>
        <TextInput
          type="text"
          autoComplete="off"
          onChange={handleChange} // singleとは挙動が少し異なる
          onKeyDown={(e) => {
            const value = handleKeydown(e)
            if (value) {
              onChange(value)
              reset()
            }
          }}
          onFocus={onFocus}
          onCompositionStart={onCompositionStart}
          onCompositionEnd={onCompositionEnd}
          ref={inputRef}
        />
      </div>

      <MenuContent>
        {suggestions.map((d) => (
          <MenuItem
            key={d}
            onClick={() => {
              const value = handleClick(d)
              onChange(value)
              reset()
            }}
          >
            {d}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  )
}
