'use client'

import { Label, LabelAction } from '@/components/elements/Label'
import { AutocompleteInputGroup } from '@/components/forms/AutocompleteInput'
import {
  Form,
  FormErrorMessage,
  FormField,
  FormLabel,
} from '@/components/forms/Form'
import { TextInput } from '@/components/forms/TextInput'
import { HStack } from '@/components/layouts/HStack'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { ArticleEditor } from '../../../components/articleEditor/ArticleEditor'
import { Schema } from '../../articleCreate.schema'

type Props = {
  categoryOptions: string[]
}
export const ArticleCreateForm: React.FC<Props> = ({ categoryOptions }) => {
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
  const options = categoryOptions.filter((d) => !names.includes(d))

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
          options={options}
        />
        {fields?.length > 0 && (
          <HStack gap={2} style={{ flexWrap: 'wrap' }}>
            {fields?.map((d, index) => (
              <Label key={d.id}>
                {d.name}
                <LabelAction onClick={() => remove(index)} />
              </Label>
            ))}
          </HStack>
        )}
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
