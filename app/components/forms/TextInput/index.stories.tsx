import type { Meta, StoryObj } from '@storybook/react'
import { TextInput } from './index'
import { FormField, Form } from '../Form'

const meta: Meta<typeof TextInput> = {
  title: 'form/TextInput',
  component: TextInput,
}
export default meta
type Story = StoryObj<typeof TextInput>

function Render() {
  return (
    <Form>
      <FormField name="default">
        <TextInput />
      </FormField>
      <FormField name="default focus">
        <TextInput id="focus" value="value" />
      </FormField>
      <FormField name="invalid" serverInvalid>
        <TextInput />
      </FormField>
      <FormField name="invalid focus" serverInvalid>
        <TextInput id="focus" value="value" />
      </FormField>
    </Form>
  )
}

export const Default: Story = {
  args: {},
  render: (args) => <Render {...args} />,
}
