import { VStack } from '@/components/layouts/VStack'
import type { Meta, StoryObj } from '@storybook/react'
import { Field, FieldLabel } from '../Field'
import { TextInput } from './index'

const meta: Meta<typeof TextInput> = {
  title: 'form/TextInput',
  component: TextInput,
}
export default meta
type Story = StoryObj<typeof TextInput>

const Render: React.FC = () => {
  return (
    <VStack>
      <Field>
        <FieldLabel>Normal</FieldLabel>
        <TextInput />
      </Field>
      <Field>
        <FieldLabel>Normal Focus</FieldLabel>
        <TextInput id="focus" />
      </Field>
      <Field invalid>
        <FieldLabel>Error</FieldLabel>
        <TextInput />
      </Field>
      <Field invalid>
        <FieldLabel>Error Focus</FieldLabel>
        <TextInput id="focus" />
      </Field>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
