import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Checkbox, CheckboxGroup } from '../Checkbox'
import { Field, FieldError } from '../Field'
import { TextInput } from '../TextInput'
import { Fieldset, FieldsetLegend } from './index'

const meta: Meta<typeof TextInput> = {
  title: 'form/Fieldset',
  component: Fieldset,
}
export default meta
type Story = StoryObj<typeof Fieldset>

const schema = z.object({
  emails: z.array(z.string()).min(1, 'At least one option must be selected'),
})

const options = [
  { value: 'http', label: 'HTTP' },
  { value: 'https', label: 'HTTPS' },
  { value: 'ssh', label: 'SSH' },
]

type Schema = z.infer<typeof schema>

/**
 * NOTE:
 * @see https://base-ui.com/react/handbook/forms#react-hook-form
 */
const Render: FC = () => {
  const { control, watch } = useForm<Schema>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      emails: ['http'],
    },
  })

  console.log(watch('emails'))

  return (
    <Controller
      name="emails"
      control={control}
      render={({
        field: { value, onChange },
        fieldState: { invalid, error },
      }) => (
        <Field invalid={invalid}>
          <Fieldset
            render={<CheckboxGroup value={value} onValueChange={onChange} />}
          >
            <FieldsetLegend>Emails</FieldsetLegend>
            {options.map(({ value, label }) => (
              <Checkbox value={value} error={!!error} key={value}>
                {label}
              </Checkbox>
            ))}
          </Fieldset>
          <FieldError match={!!error}>{error?.message}</FieldError>
        </Field>
      )}
    />
  )
}

export const Default: Story = {
  render: () => <Render />,
}
