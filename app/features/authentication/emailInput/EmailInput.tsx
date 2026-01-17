'use client'

import { Lens } from '@hookform/lenses'
import { FC } from 'react'
import { useController } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { TextInput } from '@/components/forms/TextInput'

type EmailInputProps = {
  lens: Lens<{ email: string }>
}

// useControllerで表現する場合
export const EmailInput: FC<EmailInputProps> = ({ lens }) => {
  const interop = lens.focus('email').interop()
  const { field, fieldState } = useController(interop)
  const { invalid, error } = fieldState

  return (
    <Field invalid={invalid}>
      <FieldLabel>メールアドレス</FieldLabel>
      <TextInput type="email" {...field} />
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )
}
