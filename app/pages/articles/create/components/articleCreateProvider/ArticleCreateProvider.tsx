'use client'

import { CONTENT } from '@/functions/libs/drizzle/constants/articles'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Schema, schema } from '../../../shared/articleForm/articleForm.schema'

const defaultValues = {
  title: '',
  content: CONTENT,
  categories: [],
  status: 'PUBLISHED' as const,
}

export const ArticleCreateProvider: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
