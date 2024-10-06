/* eslint-disable react/no-array-index-key */
import {
  ElementRef,
  useRef,
  ComponentProps,
  forwardRef,
  ChangeEvent,
} from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import { useMergeRef } from '@/functions/hooks/useMergeRef'
import { TextInput } from '../../TextInput'
import { useAutocompleteInput } from '../hooks/useAutocompleteInput'

type Ref = ElementRef<'input'>
type Props = { options: string[] } & ComponentProps<typeof TextInput>
export const AutocompleteInput = forwardRef<Ref, Props>((props, ref) => {
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
        {...props}
        onChange={(e) => {
          onChange(e)
          props.onChange?.(e)
        }}
        onKeyDown={(e) => {
          onKeyDown(e, (value) => {
            const event = {
              target: { value, name: props.name },
            } as ChangeEvent<HTMLInputElement>
            props.onChange?.(event)
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
})

AutocompleteInput.displayName = 'AutocompleteInput'
