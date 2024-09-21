import type { Meta, StoryObj } from '@storybook/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { AutocompleteInput } from '.'
import { options } from '../forms.constant'

const meta = {
  title: 'form/AutocompleteInput',
  component: AutocompleteInput,
} satisfies Meta<typeof AutocompleteInput>

export default meta
type Story = StoryObj<typeof meta>

const schema = z.object({
  text: z.string(),
})

const Render: React.FC = () => {
  const {
    control,
    watch,
    formState: { dirtyFields, errors },
  } = useForm({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      text: 'JavaScript',
    },
  })

  return (
    <Form>
      <p>Preview: {watch('text') ? watch('text') : '-----'}</p>
      <FormField name="text" serverInvalid={!!errors.text}>
        <FormLabel>Content</FormLabel>
        <Controller
          control={control}
          name="text"
          render={({ field: { onChange, ...rest } }) => (
            <AutocompleteInput
              onChange={onChange}
              isDirty={!!dirtyFields.text}
              options={options}
              {...rest}
            />
          )}
        />
        <FormErrorMessage>{errors.text?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

export const Default: Story = {
  args: {
    onChange: () => {},
    options: [],
  },
  render: () => <Render />,
}
