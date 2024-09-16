'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { content } from '@/functions/constants/content'
import { schema, Schema } from '../articleCreate.schema'

export const ArticleCreateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const methods = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      content,
    },
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
