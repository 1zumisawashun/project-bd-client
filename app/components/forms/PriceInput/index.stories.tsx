import type { Meta, StoryObj } from '@storybook/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PriceInput } from './index'
import { FormErrorMessage, FormField, Form } from '../Form'

const meta: Meta<typeof PriceInput> = {
  title: 'form/PriceInput',
  component: PriceInput,
}
export default meta
type Story = StoryObj<typeof PriceInput>

const schema = z.object({
  price: z.number().max(10000, 'Price must be less than 10000'),
})

function Render() {
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
  args: {},
  render: (args) => <Render {...args} />,
}
