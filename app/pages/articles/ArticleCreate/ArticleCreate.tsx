'use client'

import { Footer } from '@/components/elements/Footer'
import styles from '@/components/layouts/SiteWrapper/index.module.css'
import { StickyWrapper } from '@/components/layouts/StickyWrapper'
import { FC } from 'react'
import { Schema } from './articleCreate.schema'
import { ArticleCreateForm } from './components/articleCreateForm/ArticleCreateForm'
import { ArticleCreateHeader } from './components/articleCreateHeader/ArticleCreateHeader'
import { ArticleCreateProvider } from './components/articleCreateProvider/ArticleCreateProvider'

const BLOCK_NAME = 'site-wrapper'
type Props = {
  defaultValues: Schema
  categoryOptions: string[]
}
export const ArticleCreate: FC<Props> = ({
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
          <ArticleCreateForm categoryOptions={categoryOptions} />
        </main>
        <Footer />
      </div>
    </ArticleCreateProvider>
  )
}
