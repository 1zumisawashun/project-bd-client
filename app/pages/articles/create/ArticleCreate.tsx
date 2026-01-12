'use client'

import { Footer } from '@/components/elements/Footer'
import styles from '@/components/layouts/SiteWrapper/index.module.css'
import { StickyWrapper } from '@/components/layouts/StickyWrapper'
import { FC } from 'react'
import { ArticleCategory } from '../shared/article.types'
import { ArticleForm } from '../shared/articleForm/ArticleForm'
import { ArticleCreateHeader } from './components/articleCreateHeader/ArticleCreateHeader'
import { ArticleCreateProvider } from './components/articleCreateProvider/ArticleCreateProvider'

const BLOCK_NAME = 'site-wrapper'

type ArticleCreateProps = {
  categories: ArticleCategory[]
}

export const ArticleCreate: FC<ArticleCreateProps> = ({ categories }) => {
  const categoryOptions = categories?.map((category) => category.name) ?? []

  return (
    <ArticleCreateProvider>
      <div className={styles[`${BLOCK_NAME}`]}>
        <StickyWrapper>
          <ArticleCreateHeader />
        </StickyWrapper>
        <main className={styles[`${BLOCK_NAME}-inner`]}>
          {/* NOTE: sharedはI/Fをdatasourceに依存させない方が良さそう */}
          <ArticleForm categoryOptions={categoryOptions} />
        </main>
        <Footer />
      </div>
    </ArticleCreateProvider>
  )
}
