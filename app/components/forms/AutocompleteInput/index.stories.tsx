import type { Meta, StoryObj } from '@storybook/react'
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form'
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
import {
  AutocompleteInputGroup,
  AutocompleteInputControl,
  AutocompleteInput,
} from '.'
import { options } from '../forms.constant'

const meta = {
  title: 'form/AutocompleteInput',
  component: AutocompleteInputControl,
} satisfies Meta<typeof AutocompleteInputControl>

export default meta
type Story = StoryObj<typeof meta>

/**
 * ================================================
 * AutocompleteInputSingleUnControl
 * ================================================
 */
const SingleUnControl: React.FC = () => {
  const schema = z.object({
    category: z.string(),
  })

  type Schema = z.infer<typeof schema>

  const {
    control,
    register,
    formState: { errors },
  } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      category: '',
    },
  })

  const preview = useWatch({ control, name: 'category' }) ?? '-----'

  return (
    <Form>
      <p>Preview: {preview}</p>
      <FormField name="category" serverInvalid={!!errors.category}>
        <FormLabel>Content</FormLabel>
        <AutocompleteInput options={options} {...register('category')} />
        <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

export const AutocompleteInputSingleUnControl: Story = {
  args: {
    onChange: () => {},
    options: [],
  },
  render: () => <SingleUnControl />,
}

/**
 * ================================================
 * AutocompleteInputSingleControl
 * ================================================
 */
const SingleControl: React.FC = () => {
  const schema = z.object({
    category: z.string(),
  })

  type Schema = z.infer<typeof schema>

  const {
    control,
    formState: { errors },
  } = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      category: '',
    },
  })

  const preview = useWatch({ control, name: 'category' }) ?? '-----'

  return (
    <Form>
      <p>Preview: {preview}</p>
      <FormField name="category" serverInvalid={!!errors.category}>
        <FormLabel>Content</FormLabel>
        <Controller
          control={control}
          name="category"
          render={({ field: { onChange, ...rest } }) => (
            <AutocompleteInputControl
              onChange={onChange}
              options={options}
              {...rest}
            />
          )}
        />
        <FormErrorMessage>{errors.category?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}

export const AutocompleteInputSingleControl: Story = {
  args: {
    onChange: () => {},
    options: [],
  },
  render: () => <SingleControl />,
}

/**
 * ================================================
 * AutocompleteInputMultiple
 * ================================================
 */
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

  return (
    <Form>
      <FormField name="text" serverInvalid={!!errors.categories}>
        <FormLabel>カテゴリー</FormLabel>
        <AutocompleteInputGroup
          onChange={(value) => append({ name: value })}
          options={options.filter((d) => !names.includes(d))}
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
    options: [],
  },
  render: () => <Multiple />,
}
