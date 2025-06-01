import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormErrorMessage, FormField } from '../Form'
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

const Render: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      price: 1000,
    },
  })
  return (
    <Form>
      <FormField name="price" serverInvalid={!!errors.price}>
        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, onBlur, ...rest } }) => (
            <PriceInput onChange={onChange} onBlur={onBlur} {...rest} />
          )}
        />
        <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
