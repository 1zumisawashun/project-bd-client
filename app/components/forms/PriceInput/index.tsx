import { HStack } from '@/components/layouts/HStack'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { TextInput } from '../TextInput'
import { CustomProps } from './types'
import { usePriceInput } from './usePriceInput'

type PriceInputProps = Omit<
  ComponentProps<typeof TextInput>,
  'value' | 'onChange' | 'onBlur'
>

type Props = PriceInputProps & CustomProps

type Ref = ElementRef<'input'>

export const PriceInput = forwardRef<Ref, Props>(
  ({ value, onChange, onBlur, ...props }, ref) => {
    const { price, priceInputHandler } = usePriceInput({
      value,
      onChange,
      onBlur,
    })

    return (
      <HStack align="center">
        <TextInput
          {...props}
          // native props
          ref={ref}
          // custom props
          value={price}
          {...priceInputHandler()}
        />
        <span>円</span>
      </HStack>
    )
  },
)

PriceInput.displayName = 'PriceInput'
