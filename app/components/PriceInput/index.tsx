/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import {
  FocusEventHandler,
  ChangeEventHandler,
  forwardRef,
  ComponentProps,
  ElementRef,
} from 'react'
import { FieldError } from 'react-hook-form'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { TextInput } from '../TextInput'

type Props = {
  onChange: (numberValue?: number) => void
  onBlur: () => void
  error?: FieldError | undefined
  name: string
} & Omit<ComponentProps<typeof TextInput>, 'onChange' | 'onBlur' | 'name'>

type Ref = ElementRef<'input'>

type PriceInputHandlerReturnType = {
  onFocus: FocusEventHandler<HTMLInputElement>
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
}

const transformFullWidthNumbers = (value: string) => {
  const fullWidthNumbers = '０１２３４５６７８９'
  const halfWidthNumbers = '0123456789'

  return value.replace(
    /[０-９]/g,
    (char) => halfWidthNumbers[fullWidthNumbers.indexOf(char)]!,
  )
}

export const PriceInput = forwardRef<Ref, Props>(
  ({ error, value, name, ...rest }, ref) => {
    const {
      isOpen: isPrice,
      open: showPrice,
      close: hidePrice,
    } = useDisclosure()

    const price = value ?? ''
    const priceWithComma = value?.toLocaleString() ?? ''

    const priceInputHandler = (): PriceInputHandlerReturnType => {
      return {
        onChange: (e) => {
          if (!e.target.value) {
            rest.onChange(undefined)
            return
          }

          // NOTE: 大文字数字を半角数字に変換し、半角数字以外の文字列を削除する
          const cleanValue = transformFullWidthNumbers(e.target.value).replace(
            /\D+/g,
            '',
          )
          const numberValue = Number(cleanValue)
          if (Number.isNaN(numberValue)) {
            throw new Error('Invalid number')
          }

          rest.onChange(numberValue)
        },
        onFocus: () => {
          showPrice()
        },
        onBlur: () => {
          hidePrice()
          rest.onBlur()
        },
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        <TextInput
          ref={ref}
          {...rest}
          value={isPrice ? price : priceWithComma}
          {...priceInputHandler()}
        />
        <span>円</span>
      </div>
    )
  },
)

PriceInput.displayName = 'PriceInput'
