/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import type { Meta, StoryObj } from '@storybook/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { TextInput } from '../TextInput'
import { Form, FormErrorMessage, FormField, FormLabel } from './index'

const meta: Meta<typeof TextInput> = {
  title: 'form/Form',
  component: TextInput,
}
export default meta
type Story = StoryObj<typeof TextInput>

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'This field is required'),
})

function Render() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  return (
    <Form>
      <FormField name="email" serverInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <TextInput type="email" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormField>

      <FormField name="password" serverInvalid={!!errors.password}>
        <FormLabel>Question</FormLabel>
        <TextInput {...register('password')} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

export const Default: Story = {
  args: {},
  render: (args) => <Render {...args} />,
}
