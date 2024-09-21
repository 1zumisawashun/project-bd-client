import {
  useState,
  ChangeEvent,
  ElementRef,
  useRef,
  ComponentProps,
  forwardRef,
} from 'react'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { useOuterClick } from '../hooks/useOuterClick'
import { TextInput } from '../../TextInput'
import { Button } from '../../../buttons/Button'
import styles from '../index.module.scss'

const BLOCK_NAME = 'autocomplete-input'
type Ref = ElementRef<'input'>
type Props = {
  onChange: (value?: string) => void // react-hook-form's onChange
  isDirty?: boolean
  options: string[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>

export const AutocompleteInput = forwardRef<Ref, Props>(
  ({ onChange, onBlur, isDirty = false, options, ...rest }, ref) => {
    const { isOpen, open, close } = useDisclosure()

    const referenceRef = useRef<ElementRef<'div'>>(null)

    const [suggestions, setSuggestions] = useState<string[]>([])

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

    const handleClick = (value: string) => {
      setSuggestions(options.filter((d) => d.startsWith(value)))
      onChange(value)
    }

    const handleFocus = () => {
      if (!isDirty) {
        setSuggestions(options)
      } else {
        setSuggestions(
          options.filter((d) => d.startsWith(rest.value as string)),
        )
      }
      open()
    }

    useOuterClick([referenceRef], () => {
      close()
    })

    return (
      <div className={styles[`${BLOCK_NAME}-wrapper`]}>
        <div ref={referenceRef}>
          <TextInput
            type="text"
            onChange={handleChange}
            onFocus={handleFocus}
            ref={ref}
            {...rest}
          />
        </div>
        {isOpen && (
          <div className={styles[`${BLOCK_NAME}-list`]}>
            {suggestions?.map((d) => (
              <Button
                key={d}
                onClick={() => handleClick(d)}
                variant="ghost"
                className={styles[`${BLOCK_NAME}-item`]}
              >
                {d}
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  },
)

AutocompleteInput.displayName = 'AutocompleteInput'
