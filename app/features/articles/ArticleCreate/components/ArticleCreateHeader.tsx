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
import { HStack } from '@/components/layouts/HStack'
import styles from '../articleCreate.module.scss'
import { Schema } from '../articleCreate.schema'
import { createArticle } from '../articleCreate.action'

const BLOCK_NAME = 'article-create'
export const ArticleCreateHeader: React.FC = () => {
  const router = useRouter()
  const openToast = useToastDispatch()
  const { handleSubmit, setValue } = useFormContext<Schema>()

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    startTransition(async () => {
      const response = await createArticle({ data })

      if (!response?.isSuccess) {
        openToast({
          theme: 'danger',
          title: 'エラーが発生しました',
          description: response?.error?.message ?? 'エラーが発生しました',
        })
        return
      }
      openToast({
        theme: 'success',
        title: '成功しました',
        description: response.message ?? '成功しました',
      })

      router.push(`/articles/${response.data?.id ?? ''}`)
      router.refresh()
    })
  }

  const onError: SubmitErrorHandler<Schema> = (error) => {
    openToast({
      theme: 'danger',
      title: 'エラーが発生しました',
      description: JSON.stringify(error, null, 2),
    })
  }

  return (
    <header className={styles[`${BLOCK_NAME}-header`]}>
      <IconAnchorButton href="/" variant="ghost">
        <ChevronLeftIcon />
      </IconAnchorButton>
      <HStack>
        <Button
          onClick={(e) => {
            setValue('status', 'DRAFT', { shouldDirty: true })
            handleSubmit(onSubmit, onError)(e)
          }}
        >
          一時保存する
        </Button>
        <Button
          onClick={(e) => {
            setValue('status', 'PUBLISHED', { shouldDirty: true })
            handleSubmit(onSubmit, onError)(e)
          }}
        >
          投稿する
        </Button>
      </HStack>
    </header>
  )
}
