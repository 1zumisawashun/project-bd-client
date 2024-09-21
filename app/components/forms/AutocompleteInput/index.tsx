/* eslint-disable react/no-array-index-key */

import {
  useState,
  ChangeEvent,
  ElementRef,
  useRef,
  ComponentProps,
  forwardRef,
} from 'react'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { useOuterClick } from './hooks/useOuterClick'
import { TextInput } from '../TextInput'
import { Button } from '../../buttons/Button'
import styles from './index.module.scss'

const BLOCK_NAME = 'autocomplete-input'

type Option = { id: number; text: string }
type Ref = ElementRef<'input'>
type Props = {
  onChange: (value?: string) => void // react-hook-form's onChange
  isDirty?: boolean
  options: Option[]
} & Omit<ComponentProps<typeof TextInput>, 'onChange'>

// onBlurは捨てる
export const AutocompleteInput = forwardRef<Ref, Props>(
  ({ onChange, onBlur, isDirty = false, options, ...rest }, ref) => {
    const { isOpen, open, close } = useDisclosure()

    const referenceRef = useRef<ElementRef<'div'>>(null)

    const [suggestions, setSuggestions] = useState<Option[]>([])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target

      if (value.length > 0) {
        setSuggestions(options.filter(({ text }) => text.startsWith(value)))
        open()
      } else {
        setSuggestions(options.filter(({ text }) => text.startsWith(value)))
        close()
      }

      onChange(value)
    }

    const handleClick = (suggestion: Option) => {
      const value = suggestion.text

      setSuggestions(options.filter(({ text }) => text.startsWith(text)))
      onChange(value)
    }

    const handleFocus = () => {
      if (!isDirty) {
        setSuggestions(options)
      } else {
        setSuggestions(
          options.filter(({ text }) => text.startsWith(rest.value as string)),
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
            {suggestions?.map((suggestion, i) => (
              <Button
                key={i}
                onClick={() => handleClick(suggestion)}
                variant="ghost"
                className={styles[`${BLOCK_NAME}-item`]}
              >
                {suggestion.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    )
  },
)

AutocompleteInput.displayName = 'AutocompleteInput'
