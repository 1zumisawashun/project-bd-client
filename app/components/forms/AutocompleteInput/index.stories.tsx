import type { Meta, StoryObj } from '@storybook/react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { Label, LabelAction } from '@/components/elements/Label'
import { HStack } from '@/components/layouts/HStack'
import { AutocompleteInputGroup, AutocompleteInput } from '.'
import { options } from '../forms.constant'

const meta = {
  title: 'form/AutocompleteInput',
  component: AutocompleteInput,
} satisfies Meta<typeof AutocompleteInput>

export default meta
type Story = StoryObj<typeof meta>

const Single: React.FC = () => {
  const schema = z.object({
    category: z.string(),
  })

  type Schema = z.infer<typeof schema>

  const {
    control,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      category: 'JavaScript',
    },
  })

  return (
    <Form>
      <p>Preview: {watch('category') ? watch('category') : '-----'}</p>
      <FormField name="category" serverInvalid={!!errors.category}>
        <FormLabel>Content</FormLabel>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, ...rest } }) => (
            <AutocompleteInput
              onChange={onChange}
              rows={options}
              {...rest}
            />
          )}
        />
        <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

export const AutocompleteInputSingle: Story = {
  args: {
    onChange: () => {},
    rows: [],
  },
  render: () => <Single />,
}

const Multiple: React.FC = () => {
  const schema = z.object({
    categories: z
      .object({ name: z.string() })
      .array()
      .max(5, '最大で5つまで登録できます'),
  })

  type Schema = z.infer<typeof schema>

  const {
    control,
    formState: { errors },
  } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      categories: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  })

  const names = fields.map((d) => d.name)
  const rows = options.filter((d) => !names.includes(d))

  return (
    <Form>
      <FormField name="text" serverInvalid={!!errors.categories}>
        <FormLabel>カテゴリー</FormLabel>
        <AutocompleteInputGroup
          onChange={(value) => append({ name: value })}
          rows={rows}
        />
        <HStack gap={2} style={{ margin: '0.5rem', flexWrap: 'wrap' }}>
          {fields?.map((d, index) => (
            <Label key={d.id}>
              {d.name}
              <LabelAction onClick={() => remove(index)} />
            </Label>
          ))}
        </HStack>
        <FormErrorMessage>{errors.categories?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

export const AutocompleteInputMultiple: Story = {
  args: {
    onChange: () => {},
    rows: [],
  },
  render: () => <Multiple />,
}
