'use client'

import { Footer } from '@/components/elements/Footer'
import styles from '@/components/layouts/SiteWrapper/index.module.css'
import { StickyWrapper } from '@/components/layouts/StickyWrapper'
import { FC } from 'react'
import { ArticleForm } from '../shared/articleForm/ArticleForm'
import { Schema } from '../shared/articleForm/articleForm.schema'
import { ArticleCreateHeader } from './components/articleCreateHeader/ArticleCreateHeader'
import { ArticleCreateProvider } from './components/articleCreateProvider/ArticleCreateProvider'

const BLOCK_NAME = 'site-wrapper'

type ArticleCreateProps = {
  defaultValues: Schema
  categoryOptions: string[]
}

export const ArticleCreate: FC<ArticleCreateProps> = ({
  defaultValues,
  categoryOptions,
}) => {
  return (
    <ArticleCreateProvider defaultValues={defaultValues}>
      <div className={styles[`${BLOCK_NAME}`]}>
        <StickyWrapper>
          <ArticleCreateHeader />
        </StickyWrapper>
        <main className={styles[`${BLOCK_NAME}-inner`]}>
          <ArticleForm categoryOptions={categoryOptions} />
        </main>
        <Footer />
      </div>
    </ArticleCreateProvider>
  )
}
