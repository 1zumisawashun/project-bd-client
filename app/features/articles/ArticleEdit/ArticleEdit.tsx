'use client'

import { Footer } from '@/components/elements/Footer'
import styles from '@/components/layouts/SiteWrapper/index.module.css'
import { StickyWrapper } from '@/components/layouts/StickyWrapper'
import { Schema } from './articleEdit.schema'
import { ArticleEditForm } from './components/articleEditForm/ArticleEditForm'
import { ArticleEditHeader } from './components/articleEditHeader/ArticleEditHeader'
import { ArticleEditProvider } from './components/articleEditProvider/ArticleEditProvider'

const BLOCK_NAME = 'site-wrapper'
type Props = {
  articleId: string
  defaultValues: Schema
  categoryOptions: string[]
}
export const ArticleEdit: React.FC<Props> = ({
  articleId,
  defaultValues,
  categoryOptions,
}) => {
  return (
    <ArticleEditProvider defaultValues={defaultValues}>
      <div className={styles[`${BLOCK_NAME}`]}>
        <StickyWrapper>
          <ArticleEditHeader articleId={articleId} />
        </StickyWrapper>
        <main className={styles[`${BLOCK_NAME}-inner`]}>
          <ArticleEditForm categoryOptions={categoryOptions} />
        </main>
        <Footer />
      </div>
    </ArticleEditProvider>
  )
}
