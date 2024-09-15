'use client'

import styles from '@/components/layouts/SiteWrapper/index.module.scss'
import { Footer } from '@/components/layouts/Footer'
import { ArticleCreateForm } from './components/ArticleCreateForm'
import { ArticleCreateHeader } from './components/ArticleCreateHeader'
import { ArticleCreateProvider } from './components/ArticleCreateProvider'

const BLOCK_NAME = 'site-wrapper'
export const ArticleCreate: React.FC = () => {
  return (
    <ArticleCreateProvider>
      <div className={styles[`${BLOCK_NAME}`]}>
        <ArticleCreateHeader />
        <main className={styles[`${BLOCK_NAME}-inner`]}>
          <ArticleCreateForm />
        </main>
        <Footer />
      </div>
    </ArticleCreateProvider>
  )
}
