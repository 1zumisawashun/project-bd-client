import { VStack } from '@/components/layouts/VStack'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { TextInput } from '../TextInput'
import { Field, FieldError, FieldLabel } from './index'

const meta: Meta<typeof TextInput> = {
  title: 'form/Field',
  component: TextInput,
}
export default meta
type Story = StoryObj<typeof TextInput>

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'This field is required'),
})

/**
 * NOTE:
 * @see https://base-ui.com/react/handbook/forms#react-hook-form
 */
const Render: React.FC = () => {
  const { control } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <VStack>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Field invalid={invalid}>
            <FieldLabel>Email</FieldLabel>
            <TextInput {...field} />
            <FieldError match={!!error}>{error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Field invalid={invalid}>
            <FieldLabel>Password</FieldLabel>
            <TextInput {...field} />
            <FieldError match={!!error}>{error?.message}</FieldError>
          </Field>
        )}
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
