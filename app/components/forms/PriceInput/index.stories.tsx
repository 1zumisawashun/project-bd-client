import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Field, FieldError, FieldLabel } from '../Field'
import { PriceInput } from './index'

const meta: Meta<typeof PriceInput> = {
  title: 'form/PriceInput',
  component: PriceInput,
}

export default meta

type Story = StoryObj<typeof PriceInput>

const schema = z.object({
  price: z.number().max(10000, 'Price must be less than 10000'),
})

const Render: FC = () => {
  const { control } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      price: 1000,
    },
  })

  return (
    <Controller
      control={control}
      name="price"
      render={({ field, fieldState: { invalid, error } }) => (
        <Field invalid={invalid}>
          <FieldLabel>PriceInput</FieldLabel>
          <PriceInput {...field} />
          <FieldError match={!!error}>{error?.message}</FieldError>
        </Field>
      )}
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}
