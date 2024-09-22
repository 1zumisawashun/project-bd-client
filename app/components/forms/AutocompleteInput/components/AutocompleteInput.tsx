import { ElementRef, useRef, ComponentProps, forwardRef } from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import { TextInput } from '../../TextInput'
import { useAutocompleteInput } from '../hooks/useAutocompleteInput'

type Ref = ElementRef<'input'>
type Props = {
  onChange: (value?: string) => void // react-hook-form's onChange
  rows: string[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>
export const AutocompleteInput = forwardRef<Ref, Props>(
  ({ onChange, onBlur, rows, ...rest }, ref) => {
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

    // eslint-disable-next-line no-underscore-dangle
    const _suggestions = suggestions.filter((d) => d !== rest.value)

    const referenceRef = useRef<ElementRef<'div'>>(null)

    useOuterClick([referenceRef], () => {
      menu.close()
    })

    return (
      <Menu isOpen={menu.isOpen} open={menu.open} close={menu.close}>
        <div ref={referenceRef}>
          <TextInput
            type="text"
            autoComplete="off"
            onChange={(e) => {
              const value = handleChange(e)
              onChange(value)
            }}
            onKeyDown={(e) => {
              const value = handleKeydown(e)
              onChange(value!)
            }}
            onFocus={onFocus}
            onCompositionStart={onCompositionStart}
            onCompositionEnd={onCompositionEnd}
            ref={ref}
            {...rest}
          />
        </div>

        <MenuContent>
          {_suggestions.map((d) => (
            <MenuItem
              key={d}
              onClick={() => {
                const value = handleClick(d)
                onChange(value)
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

AutocompleteInput.displayName = 'AutocompleteInput'
