'use client'

import { AutocompleteInputGroup } from '@/components/archive/AutocompleteInput'
import { Label } from '@/components/elements/Label'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { TextInput } from '@/components/forms/TextInput'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { FC } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { ArticleEditor } from '../../../components/articleEditor/ArticleEditor'
import { Schema } from '../../articleEdit.schema'

type Props = {
  categoryOptions: string[]
}
export const ArticleEditForm: FC<Props> = ({ categoryOptions }) => {
  const { control } = useFormContext<Schema>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  })

  const names = fields.map((d) => d.name)
  const options = categoryOptions.filter((d) => !names.includes(d))

  return (
    <VStack>
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Field invalid={invalid}>
            <FieldLabel>タイトル</FieldLabel>
            <TextInput {...field} />
            <FieldError match={!!error}>{error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="categories"
        control={control}
        render={({ fieldState: { invalid, error } }) => (
          <Field invalid={invalid}>
            <FieldLabel>カテゴリー</FieldLabel>
            <AutocompleteInputGroup
              onChange={(value) => append({ name: value })}
              options={options}
            />
            {fields?.length > 0 && (
              <HStack gap={2} style={{ flexWrap: 'wrap' }}>
                {fields?.map((d, index) => (
                  <Label key={d.id} onClick={() => remove(index)}>
                    {d.name}
                  </Label>
                ))}
              </HStack>
            )}
            <FieldError match={!!error}>{error?.message}</FieldError>
          </Field>
        )}
      />
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Field invalid={invalid}>
            <FieldLabel>本文</FieldLabel>
            <ArticleEditor onChange={field.onChange} value={field.value} />
            <FieldError match={!!error}>{error?.message}</FieldError>
          </Field>
        )}
      />
    </VStack>
  )
}
