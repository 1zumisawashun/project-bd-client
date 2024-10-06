/* eslint-disable react/no-array-index-key */
import { ElementRef, useRef, ComponentProps, forwardRef } from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
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

  const inputRef = useRef<Ref>(null!)

  const mergeRef = useMergeRef(inputRef, ref)

  const updateInputRef = (value: string) => {
    inputRef.current.value = value
  }

  return (
    <Menu isOpen={menu.isOpen} open={menu.open} close={menu.close}>
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
        {suggestions.map((d, index) => (
          <MenuItem
            key={index}
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
