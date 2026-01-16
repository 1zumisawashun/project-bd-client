'use client'

import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { TextInput } from '@/components/forms/TextInput'
import { Lens } from '@hookform/lenses'
import { FC } from 'react'
import { useController } from 'react-hook-form'

type TitleFieldProps = {
  lens: Lens<{ title: string }>
}

// useControllerで表現する場合
export const TitleInput: FC<TitleFieldProps> = ({ lens }) => {
  const interop = lens.focus('title').interop()
  const { field, fieldState } = useController(interop)
  const { invalid, error } = fieldState

  return (
    <Field invalid={invalid}>
      <FieldLabel>タイトル</FieldLabel>
      <TextInput {...field} />
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )
}
