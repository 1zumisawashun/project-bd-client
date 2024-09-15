'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { schema, Schema } from '../articleEdit.schema'

type Props = {
  children: React.ReactNode
  defaultValues: Schema
}
export const ArticleEditProvider: React.FC<Props> = ({
  children,
  defaultValues,
}) => {
  const methods = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
