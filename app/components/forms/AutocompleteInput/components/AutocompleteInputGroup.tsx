import { ElementRef, useRef, ComponentProps, forwardRef } from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import { useMergeRef } from '@/functions/hooks/useMergeRef'
import { TextInput } from '../../TextInput'
import { useAutocompleteInput } from '../hooks/useAutocompleteInput'

type Ref = ElementRef<'input'>
type Props = {
  onChange: (value: string) => void // react-hook-form's onChange
  options: string[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>
export const AutocompleteInputGroup = forwardRef<Ref, Props>((props, ref) => {
  const {
    menu,
    suggestions,
    onChange,
    onClick,
    onKeyDown,
    onFocus,
    onCompositionStart,
    onCompositionEnd,
  } = useAutocompleteInput({ options: props.options, value: props.value })

  const referenceRef = useRef<ElementRef<'div'>>(null)
  const inputRef = useRef<Ref>(null!)

  const mergeRef = useMergeRef(inputRef, ref)

  const updateInputRef = (value: string) => {
    inputRef.current.value = value
  }

  useOuterClick([referenceRef], () => {
    menu.close()
  })

  return (
    <Menu
      isOpen={menu.isOpen}
      open={menu.open}
      close={menu.close}
      ref={referenceRef}
    >
      <TextInput
        type="text"
        autoComplete="off"
        onChange={onChange}
        onKeyDown={(e) => {
          onKeyDown(e, (value) => {
            props.onChange(value)
            updateInputRef('')
          })
        }}
        onFocus={onFocus}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        ref={mergeRef}
      />
      <MenuContent>
        {suggestions.map((d) => (
          <MenuItem
            key={d}
            onClick={() => {
              onClick()
              props.onChange(d)
              updateInputRef('')
            }}
          >
            {d}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  )
})

AutocompleteInputGroup.displayName = 'AutocompleteInputGroup'
