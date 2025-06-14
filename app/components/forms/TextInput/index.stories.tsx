import type { Meta, StoryObj } from '@storybook/react'
import { Form, FormField } from '../Form'
import { TextInput } from './index'

const meta: Meta<typeof TextInput> = {
  title: 'form/TextInput',
  component: TextInput,
}
export default meta
type Story = StoryObj<typeof TextInput>

const Render: React.FC = () => {
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
  render: () => <Render />,
}
