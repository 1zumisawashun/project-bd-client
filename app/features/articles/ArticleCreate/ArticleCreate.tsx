'use client'

import styles from '@/components/layouts/SiteWrapper/index.module.scss'
import { Footer } from '@/components/layouts/Footer'
import { ArticleCreateForm } from './components/ArticleCreateForm'
import { ArticleCreateHeader } from './components/ArticleCreateHeader'
import { ArticleCreateProvider } from './components/ArticleCreateProvider'
import { Schema } from './articleCreate.schema'

const BLOCK_NAME = 'site-wrapper'
type Props = {
  defaultValues: Schema
  categoryOptions: string[]
}
export const ArticleCreate: React.FC<Props> = ({
  defaultValues,
  categoryOptions,
}) => {
  return (
    <ArticleCreateProvider defaultValues={defaultValues}>
      <div className={styles[`${BLOCK_NAME}`]}>
        <ArticleCreateHeader />
        <main className={styles[`${BLOCK_NAME}-inner`]}>
          <ArticleCreateForm categoryOptions={categoryOptions} />
        </main>
        <Footer />
      </div>
    </ArticleCreateProvider>
  )
}
