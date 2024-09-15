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
import { useToastDispatch } from '@/components/elements/Toast'
import styles from '../ArticleCreate.module.scss'
import { Schema } from '../articleCreate.schema'
import { createArticle } from '../articleCreate.action'

const BLOCK_NAME = 'article-create'
export const ArticleCreateHeader: React.FC = () => {
  const router = useRouter()
  const openToast = useToastDispatch()
  const { handleSubmit } = useFormContext<Schema>()

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    startTransition(async () => {
      const response = await createArticle(data)

      if (!response?.isSuccess) {
        openToast({
          theme: 'danger',
          title: 'エラー',
          description: response?.error?.message ?? 'エラーが発生しました',
        })
        return
      }
      openToast({
        theme: 'success',
        title: '成功',
        description: '投稿に成功しました',
      })
      router.push(`/articles/${response.data?.id ?? ''}`)
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
