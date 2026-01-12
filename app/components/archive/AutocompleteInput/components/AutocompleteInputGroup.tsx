import { Menu, MenuContent, MenuItem } from '@/components/archive/Menu'
import { useMergeRef } from '@/functions/hooks/useMergeRef'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import { ComponentProps, ElementRef, forwardRef, useRef } from 'react'
import { TextInput } from '../../../forms/TextInput'
import { useAutocompleteInput } from '../hooks/useAutocompleteInput'

type InputRef = ElementRef<'input'>

type ReferenceRef = ElementRef<'div'>

type Props = {
  onChange: (value: string) => void // react-hook-form's onChange
  options: string[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>

export const AutocompleteInputGroup = forwardRef<InputRef, Props>(
  (props, ref) => {
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

    const inputRef = useRef<InputRef>(null)
    const referenceRef = useRef<ReferenceRef>(null)

    useOuterClick([referenceRef], () => {
      menu?.close()
    })

    const mergeRef = useMergeRef(inputRef, ref)

    const updateInputRef = (value: string) => {
      if (!inputRef.current) {
        throw new Error('inputRef is not defined')
      }
      inputRef.current.value = value
    }

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
  },
)

AutocompleteInputGroup.displayName = 'AutocompleteInputGroup'
