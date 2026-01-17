'use client'

import { Lens } from '@hookform/lenses'
import { FC } from 'react'
import { useController } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { TextInput } from '@/components/forms/TextInput'

type PasswordInputProps = {
  lens: Lens<{ password: string }>
}

// useControllerで表現する場合
export const PasswordInput: FC<PasswordInputProps> = ({ lens }) => {
  const interop = lens.focus('password').interop()
  const { field, fieldState } = useController(interop)
  const { invalid, error } = fieldState

  return (
    <Field invalid={invalid}>
      <FieldLabel>パスワード</FieldLabel>
      <TextInput {...field} />
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )
}
