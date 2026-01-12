'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Schema, schema } from '../../../shared/articleForm/articleForm.schema'

type ArticleCreateProviderProps = {
  defaultValues: Schema
}

export const ArticleCreateProvider: FC<
  PropsWithChildren<ArticleCreateProviderProps>
> = ({ children, defaultValues }) => {
  const methods = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
