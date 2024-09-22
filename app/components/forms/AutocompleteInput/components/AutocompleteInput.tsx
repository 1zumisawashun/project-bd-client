import {
  useState,
  ChangeEvent,
  ElementRef,
  useRef,
  ComponentProps,
  forwardRef,
  KeyboardEvent,
} from 'react'
import { Menu, MenuContent, MenuItem } from '@/components/elements/Menu'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { useOuterClick } from '@/functions/hooks/useOuterClick'
import { TextInput } from '../../TextInput'

type Ref = ElementRef<'input'>
type Props = {
  onChange: (value?: string) => void // react-hook-form's onChange
  options: string[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>

export const AutocompleteInput = forwardRef<Ref, Props>(
  ({ onChange, onBlur, options, ...rest }, ref) => {
    const { isOpen, open, close } = useDisclosure()

    const referenceRef = useRef<ElementRef<'div'>>(null)

    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isPending, setIsPending] = useState<boolean>(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target

      if (value.length > 0) {
        setSuggestions(options.filter((d) => d.startsWith(value)))
        open()
      } else {
        setSuggestions(options.filter((d) => d.startsWith(value)))
        close()
      }

      onChange(value)
    }

    const handleFocus = () => {
      setSuggestions(options)
      open()
    }

    const handleClick = (value: string) => {
      setSuggestions(options.filter((d) => d.startsWith(value)))
      onChange(value)
    }

    const handleKeydown = (e: KeyboardEvent<Ref>) => {
      if (!isPending && e.key === 'Enter') {
        e.preventDefault()
        const { value } = e.target as HTMLInputElement

        if (!value) {
          close()
          return
        }

        setSuggestions(options.filter((d) => d.startsWith(value)))
        onChange(value)
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
            ref={ref}
            {...rest}
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
  },
)

AutocompleteInput.displayName = 'AutocompleteInput'
