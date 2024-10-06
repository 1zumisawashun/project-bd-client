import { ElementRef, useRef, ComponentProps, forwardRef } from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import { TextInput } from '../../TextInput'
import { useAutocompleteInput } from '../hooks/useAutocompleteInput'

type Ref = ElementRef<'input'>
type Props = {
  onChange: (value?: string) => void // react-hook-form's onChange
  options: string[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>
export const AutocompleteInputControl = forwardRef<Ref, Props>((props, ref) => {
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
          const { value } = e.target
          onChange(e)
          props.onChange(value)
        }}
        onKeyDown={(e) => {
          onKeyDown(e, (value) => {
            props.onChange(value)
          })
        }}
        onFocus={onFocus}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        ref={ref}
      />
      <MenuContent>
        {suggestions.map((d) => (
          <MenuItem
            key={d}
            onClick={() => {
              onClick()
              props.onChange(d)
            }}
          >
            {d}
          </MenuItem>
        ))}
      </MenuContent>
    </Menu>
  )
})

AutocompleteInputControl.displayName = 'AutocompleteInputControl'
