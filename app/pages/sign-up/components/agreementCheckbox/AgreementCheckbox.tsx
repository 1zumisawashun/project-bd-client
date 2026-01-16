'use client'

import { Checkbox } from '@/components/forms/Checkbox'
import { Field, FieldError } from '@/components/forms/Field'
import { Lens } from '@hookform/lenses'
import { FC } from 'react'
import { useController } from 'react-hook-form'

type AgreementCheckboxProps = {
  lens: Lens<{ agreement: boolean }>
}

export const AgreementCheckbox: FC<AgreementCheckboxProps> = ({ lens }) => {
  const interop = lens.focus('agreement').interop()
  const { field, fieldState } = useController(interop)
  const { invalid, error } = fieldState

  return (
    <Field invalid={invalid}>
      <Checkbox
        checked={field.value}
        onClick={() => field.onChange(!field.value)}
      >
        利用規約に同意する
      </Checkbox>
      <FieldError match={!!error}>{error?.message}</FieldError>
    </Field>
  )
}
