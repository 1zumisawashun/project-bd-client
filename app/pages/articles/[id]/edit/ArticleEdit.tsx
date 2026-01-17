'use client'

import { useLens } from '@hookform/lenses'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Footer } from '@/components/elements/Footer'
import styles from '@/components/layouts/SiteWrapper/index.module.css'
import { StickyWrapper } from '@/components/layouts/StickyWrapper'
import { Article, ArticleCategory } from '../../shared/article.types'
import { ArticleForm } from '../../shared/articleForm/ArticleForm'
import { Schema, schema } from '../../shared/articleForm/articleForm.schema'
import { ArticleEditHeader } from './components/articleEditHeader/ArticleEditHeader'

const BLOCK_NAME = 'site-wrapper'

type ArticleEditProps = {
  article: Article
  categories: ArticleCategory[]
}

export const ArticleEdit: FC<ArticleEditProps> = ({ article, categories }) => {
  const categoryOptions = categories?.map((category) => category.name) ?? []

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

  const lens = useLens<Schema>({ control: methods.control })

  // NOTE: useLensを使うことでArticleFormがFormProviderの外にあっても動作するようになる
  return (
    <div className={styles[`${BLOCK_NAME}`]}>
      <StickyWrapper>
        <FormProvider {...methods}>
          <ArticleEditHeader article={article} />
        </FormProvider>
      </StickyWrapper>
      <main className={styles[`${BLOCK_NAME}-inner`]}>
        <ArticleForm lens={lens} categoryOptions={categoryOptions} />
      </main>
      <Footer />
    </div>
  )
}
