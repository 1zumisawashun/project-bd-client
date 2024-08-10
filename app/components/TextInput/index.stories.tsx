/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import type { Meta, StoryObj } from '@storybook/react'
import * as Form from '@radix-ui/react-form'
import { TextInput } from './index'
import { Button } from '../Button'

const meta: Meta<typeof TextInput> = {
  title: 'forms/TextInput',
  component: TextInput,
}

export default meta

type Story = StoryObj<typeof TextInput>

function Render() {
  return (
    <Form.Root className="FormRoot">
      <Form.Field className="FormField" name="email">
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <Form.Label className="FormLabel">Email</Form.Label>
          <Form.Message className="FormMessage" match="valueMissing">
            Please enter your email
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            Please provide a valid email
          </Form.Message>
        </div>
        <TextInput type="email" required />
      </Form.Field>
      <Form.Field className="FormField" name="question">
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <Form.Label className="FormLabel">Question</Form.Label>
          <Form.Message
            className="FormMessage"
            match={(value: string, formData: FormData) => true}
          >
            Please enter a question
          </Form.Message>
        </div>
        <TextInput />
      </Form.Field>
      <Form.Submit asChild>
        <Button>Post question</Button>
      </Form.Submit>
    </Form.Root>
  )
}

export const Default: Story = {
  args: {},
  render: (args) => <Render {...args} />,
}

export const Error: Story = {
  args: {},
  render: (args) => <Render {...args} />,
}
