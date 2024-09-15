'use client'

import { ArticleCreate } from '@/features/articles/ArticleCreate/ArticleCreate'
import styles from '@/components/layouts/SiteWrapper/index.module.scss'
import { Footer } from '@/components/layouts/Footer'
import { ArticleCreateHeader } from '@/features/articles/ArticleCreate/components/ArticleCreateHeader'
import { ArticleCreateProvider } from '@/features/articles/ArticleCreate/components/ArticleCreateProvider'

const BLOCK_NAME = 'site-wrapper'
export default function Page() {
  return (
    <ArticleCreateProvider>
      <div className={styles[`${BLOCK_NAME}`]}>
        <ArticleCreateHeader />
        <main className={styles[`${BLOCK_NAME}-inner`]}>
          <ArticleCreate />
        </main>
        <Footer />
      </div>
    </ArticleCreateProvider>
  )
}
