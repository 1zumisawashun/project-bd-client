'use client'

import { Footer } from '@/components/elements/Footer'
import styles from '@/components/layouts/SiteWrapper/index.module.css'
import { StickyWrapper } from '@/components/layouts/StickyWrapper'
import { FC } from 'react'
import { Article, ArticleCategory } from '../../shared/article.types'
import { ArticleForm } from '../../shared/articleForm/ArticleForm'
import { ArticleEditHeader } from './components/articleEditHeader/ArticleEditHeader'
import { ArticleEditProvider } from './components/articleEditProvider/ArticleEditProvider'

const BLOCK_NAME = 'site-wrapper'

type ArticleEditProps = {
  article: Article
  categories: ArticleCategory[]
}

export const ArticleEdit: FC<ArticleEditProps> = ({ article, categories }) => {
  const categoryOptions = categories?.map((category) => category.name) ?? []

  return (
    <ArticleEditProvider article={article}>
      <div className={styles[`${BLOCK_NAME}`]}>
        <StickyWrapper>
          <ArticleEditHeader article={article} />
        </StickyWrapper>
        <main className={styles[`${BLOCK_NAME}-inner`]}>
          <ArticleForm categoryOptions={categoryOptions} />
        </main>
        <Footer />
      </div>
    </ArticleEditProvider>
  )
}
