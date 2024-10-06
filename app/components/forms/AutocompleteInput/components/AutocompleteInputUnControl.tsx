/* eslint-disable react/no-array-index-key */
import {
  ElementRef,
  useRef,
  ComponentProps,
  forwardRef,
  ChangeEvent,
} from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { useMergeRef } from '@/functions/hooks/useMergeRef'
import { TextInput } from '../../TextInput'
import { useAutocompleteInput } from '../hooks/useAutocompleteInput'

type Ref = ElementRef<'input'>
type Props = { options: string[] } & ComponentProps<typeof TextInput>
export const AutocompleteInputUnControl = forwardRef<Ref, Props>(
  (props, ref) => {
    const { menu, suggestions, onChange, onClick, onKeyDown, onFocus } =
      useAutocompleteInput({ options: props.options, value: props.value })

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
          {...props}
          onChange={(e) => {
            onChange(e)
            props.onChange?.(e)
          }}
          onKeyDown={(e) => {
            // NOTE: submitされるのでブロックする
            onKeyDown(e, () => {})
          }}
          onFocus={onFocus}
          ref={mergeRef}
        />

        <MenuContent>
          {suggestions.map((d, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                onClick()
                const e = {
                  target: { value: d, name: props.name },
                } as ChangeEvent<HTMLInputElement>
                props.onChange?.(e)
                updateInputRef(d)
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

AutocompleteInputUnControl.displayName = 'AutocompleteInputUnControl'
