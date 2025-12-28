import { Label } from '@/components/elements/Label'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import * as z from 'zod'
import {
  AutocompleteInput,
  AutocompleteInputControl,
  AutocompleteInputGroup,
} from '.'

const options = [
  'React',
  'Ruby on Rails',
  'JavaScript',
  'TypeScript',
  'Go',
  'HTML',
  'CSS',
]

const meta = {
  title: 'form/AutocompleteInput',
  component: AutocompleteInputControl,
} satisfies Meta<typeof AutocompleteInputControl>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ================================================
 * AutocompleteInputDefault
 * ================================================
 */
const DefaultRender: React.FC = () => {
  const schema = z.object({
    category: z.string(),
  })

  type Schema = z.infer<typeof schema>

  const { control } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      category: '',
    },
  })

  const preview = useWatch({ control, name: 'category' }) ?? '-----'

  return (
    <VStack>
      <p>Preview: {preview}</p>
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Field invalid={invalid}>
            <FieldLabel>Content</FieldLabel>
            <AutocompleteInput options={options} {...field} />
            <FieldError match={!!error}>{error?.message}</FieldError>
          </Field>
        )}
      />
    </VStack>
  )
}

export const Default: Story = {
  args: {
    onChange: () => null,
    options: [],
  },
  render: () => <DefaultRender />,
}

/**
 * ================================================
 * AutocompleteInputMultiple
 * ================================================
 */
const MultipleRender: React.FC = () => {
  const schema = z.object({
    categories: z
      .object({ name: z.string() })
      .array()
      .max(5, '最大で5つまで登録できます'),
  })

  type Schema = z.infer<typeof schema>

  const { control } = useForm<Schema>({
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

  return (
    <VStack>
      <Controller
        name="categories"
        control={control}
        render={({ fieldState: { invalid, error } }) => (
          <Field invalid={invalid}>
            <FieldLabel>Content</FieldLabel>
            <AutocompleteInputGroup
              onChange={(value) => append({ name: value })}
              options={options.filter((d) => !names.includes(d))}
            />
            <HStack gap={2} style={{ margin: '0.5rem', flexWrap: 'wrap' }}>
              {fields?.map((d, index) => (
                <Label key={d.id} onClick={() => remove(index)}>
                  {d.name}
                </Label>
              ))}
            </HStack>
            <FieldError match={!!error}>{error?.message}</FieldError>
          </Field>
        )}
      />
    </VStack>
  )
}

export const Multiple: Story = {
  args: {
    onChange: () => null,
    options: [],
  },
  render: () => <MultipleRender />,
}
