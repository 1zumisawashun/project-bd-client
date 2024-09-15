'use client'

import { Button } from '@/components/buttons/Button'
import { IconAnchorButton } from '@/components/buttons/IconAnchorButton'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import {
  useFormContext,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form'
import { startTransition } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../ArticleCreate.module.scss'
import { Schema } from '../articleCreate.schema'
import { createArticle } from '../articleCreate.action'

const BLOCK_NAME = 'article-create'
export const ArticleCreateHeader: React.FC = () => {
  const router = useRouter()
  const { handleSubmit } = useFormContext<Schema>()

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    startTransition(async () => {
      const response = await createArticle(data)

      if (!response?.isSuccess) {
        return
      }
      // NOTE: 詳細画面に飛ばす
      router.push('/')
    })
  }

  const onError: SubmitErrorHandler<Schema> = (error) => console.error(error)

  return (
    <header className={styles[`${BLOCK_NAME}-header`]}>
      <IconAnchorButton href="/" variant="ghost">
        <ChevronLeftIcon />
      </IconAnchorButton>
      <Button onClick={handleSubmit(onSubmit, onError)}>投稿する</Button>
    </header>
  )
}
