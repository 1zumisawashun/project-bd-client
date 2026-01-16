'use client'

import { Field, FieldError, FieldLabel } from '@/components/forms/Field'
import { Lens } from '@hookform/lenses'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { ArticleEditor } from './components/articleEditor/ArticleEditor'

type ContentFieldProps = {
  lens: Lens<{ content: string }>
}

// Controllerで表現する場合
export const ContentInput: FC<ContentFieldProps> = ({ lens }) => {
  const interop = lens.focus('content').interop()
  const { control, name } = interop

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <Field invalid={invalid}>
          <FieldLabel>本文</FieldLabel>
          <ArticleEditor onChange={field.onChange} value={field.value} />
          <FieldError match={!!error}>{error?.message}</FieldError>
        </Field>
      )}
    />
  )
}
