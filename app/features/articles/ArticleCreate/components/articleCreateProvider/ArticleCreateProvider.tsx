'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { schema, Schema } from '../../articleCreate.schema'

export const ArticleCreateProvider: React.FC<{
  children: React.ReactNode
  defaultValues: Schema
}> = ({ children, defaultValues }) => {
  const methods = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
