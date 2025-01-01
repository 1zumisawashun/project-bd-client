import { ElementRef, ComponentProps, forwardRef } from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { TextInput } from '../../TextInput'
import { useAutocompleteInput } from '../hooks/useAutocompleteInput'

type Ref = ElementRef<'input'>
type Props = {
  onChange: (value?: string) => void // react-hook-form's onChange
  options: string[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>
export const AutocompleteInputControl = forwardRef<Ref, Props>((props, ref) => {
  const { menu, suggestions, onChange, onClick, onKeyDown, onFocus } =
    useAutocompleteInput({ options: props.options, value: props.value })

  return (
    <Menu isOpen={menu.isOpen} open={menu.open} close={menu.close}>
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
          // NOTE: submitされるのでブロックする
          onKeyDown(e, () => {})
        }}
        onFocus={onFocus}
        ref={ref}
      />
      <MenuContent>
        {suggestions.map((d, index) => (
          <MenuItem
            key={index}
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
