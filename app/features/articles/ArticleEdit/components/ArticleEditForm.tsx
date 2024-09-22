'use client'

import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { TextInput } from '@/components/forms/TextInput'
import { AutocompleteInputGroup } from '@/components/forms/AutocompleteInput'
import { Label, LabelAction } from '@/components/elements/Label'
import { HStack } from '@/components/layouts/HStack'
import { ArticleEditor } from '../../components/ArticleEditor'
import { Schema } from '../articleEdit.schema'

type Props = {
  categoryOptions: string[]
}
export const ArticleEditForm: React.FC<Props> = ({ categoryOptions }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<Schema>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  })

  const names = fields.map((d) => d.name)
  const rows = categoryOptions.filter((d) => !names.includes(d))

  return (
    <Form>
      <FormField name="title" serverInvalid={!!errors.title}>
        <FormLabel>タイトル</FormLabel>
        <TextInput {...register('title')} />
        <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
      </FormField>

      <FormField name="categories" serverInvalid={!!errors.categories}>
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

      <FormField name="content" serverInvalid={!!errors.content}>
        <FormLabel>本文</FormLabel>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ArticleEditor onChange={field.onChange} value={field.value} />
          )}
        />
        <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
      </FormField>
    </Form>
  )
}
