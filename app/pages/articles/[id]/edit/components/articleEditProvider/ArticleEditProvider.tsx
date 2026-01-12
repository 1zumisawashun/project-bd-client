'use client'

import { Article } from '@/pages/articles/shared/article.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, PropsWithChildren } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Schema,
  schema,
} from '../../../../shared/articleForm/articleForm.schema'

type ArticleEditProviderProps = {
  article: Article
}

export const ArticleEditProvider: FC<
  PropsWithChildren<ArticleEditProviderProps>
> = ({ children, article }) => {
  const defaultValues = {
    title: article?.title ?? '',
    content: article?.content ?? '',
    categories:
      article?.categories?.map(({ category }) => ({ name: category.name })) ??
      [],
    status: (article?.status ?? 'PUBLISHED') as Schema['status'],
  }

  const methods = useForm<Schema>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
    defaultValues,
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
