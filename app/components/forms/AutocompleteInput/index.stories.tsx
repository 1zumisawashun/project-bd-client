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

const meta = {
  title: 'form/AutocompleteInput',
  component: AutocompleteInput,
} satisfies Meta<typeof AutocompleteInput>

export default meta
type Story = StoryObj<typeof meta>

const schema = z.object({
  text: z.string(),
})

const options = [
  { id: 1, text: 'React' },
  { id: 2, text: 'Ruby on Rails' },
  { id: 3, text: 'JavaScript' },
  { id: 4, text: 'TypeScript' },
  { id: 5, text: 'Go' },
  { id: 6, text: 'HTML' },
  { id: 7, text: 'CSS' },
]

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
