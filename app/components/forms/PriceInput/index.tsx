import { HStack } from '@/components/layouts/HStack'
import { Lens } from '@hookform/lenses'
import { ComponentProps, ElementRef, forwardRef } from 'react'
import { useController } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '../Field'
import { TextInput } from '../TextInput'
import { usePriceInput } from './hooks/usePriceInput'

type PriceInputProps = ComponentProps<typeof TextInput>

type CustomProps = { lens: Lens<{ price: number }> }

type Props = PriceInputProps & CustomProps

type Ref = ElementRef<'input'>

export const PriceInput = forwardRef<Ref, Props>(({ lens, ...props }, ref) => {
  const interop = lens.focus('price').interop()
  const { field, fieldState } = useController(interop)
  const { invalid, error } = fieldState

  const { price, priceInputHandler } = usePriceInput({
    value: field.value,
    onChange: field.onChange,
    onBlur: field.onBlur,
  })

  return (
    <Field invalid={invalid}>
      <FieldLabel>金額</FieldLabel>
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
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )
})

PriceInput.displayName = 'PriceInput'
