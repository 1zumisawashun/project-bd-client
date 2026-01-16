'use client'

import { AutocompleteInputGroup } from '@/components/archive/AutocompleteInput'
import { Label } from '@/components/elements/Label'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { HStack } from '@/components/layouts/HStack'
import { Lens } from '@hookform/lenses'
import { useFieldArray } from '@hookform/lenses/rhf'
import { FC } from 'react'
import { useController } from 'react-hook-form'

type CategoriesFieldProps = {
  categoryOptions: string[]
  lens: Lens<{ categories: { name: string }[] }>
}

// useLensのuseFieldArrayで表現する場合
export const CategoriesInput: FC<CategoriesFieldProps> = ({
  categoryOptions,
  lens,
}) => {
  const interop = lens.focus('categories').interop()
  const { fields, append, remove } = useFieldArray(interop)
  const { fieldState } = useController(interop)

  const { invalid, error } = fieldState

  const names = fields.map((d) => d.name)
  const options = categoryOptions.filter((d) => !names.includes(d))

  return (
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
  )
}
