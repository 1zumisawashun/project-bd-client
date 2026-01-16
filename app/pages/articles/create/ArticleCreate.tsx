'use client'

import { Footer } from '@/components/elements/Footer'
import styles from '@/components/layouts/SiteWrapper/index.module.css'
import { StickyWrapper } from '@/components/layouts/StickyWrapper'
import { useLens } from '@hookform/lenses'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ArticleCategory } from '../shared/article.types'
import { ArticleForm } from '../shared/articleForm/ArticleForm'
import { Schema, schema } from '../shared/articleForm/articleForm.schema'
import { defaultValues } from './articleCreate.constants'
import { ArticleCreateHeader } from './components/articleCreateHeader/ArticleCreateHeader'

const BLOCK_NAME = 'site-wrapper'

type ArticleCreateProps = {
  categories: ArticleCategory[]
}

export const ArticleCreate: FC<ArticleCreateProps> = ({ categories }) => {
  const categoryOptions = categories?.map((category) => category.name) ?? []

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
          <ArticleCreateHeader />
        </FormProvider>
      </StickyWrapper>
      <main className={styles[`${BLOCK_NAME}-inner`]}>
        <ArticleForm lens={lens} categoryOptions={categoryOptions} />
      </main>
      <Footer />
    </div>
  )
}
