'use client'

import { useToastDispatch } from '@/components/archive/Toast'
import { Button } from '@/components/buttons/Button'
import { IconAnchorButton } from '@/components/buttons/IconAnchorButton'
import { HStack } from '@/components/layouts/HStack'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form'
import { Schema } from '../../../../shared/articleForm/articleForm.schema'
import { editArticle } from './articleEditHeader.action'
import styles from './articleEditHeader.module.css'

const BLOCK_NAME = 'articleEditHeader'
type Props = {
  articleId: string
}
export const ArticleEditHeader: FC<Props> = ({ articleId }) => {
  const router = useRouter()
  const openToast = useToastDispatch()
  const {
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useFormContext<Schema>()

  const onSubmit: SubmitHandler<Schema> = (data) => {
    startTransition(async () => {
      const response = await editArticle({ data, id: articleId })

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
    <header className={styles[`${BLOCK_NAME}`]}>
      <IconAnchorButton href={`/articles/${articleId}`} variant="ghost">
        <ChevronLeftIcon />
      </IconAnchorButton>
      <HStack>
        <Button
          onClick={(e) => {
            setValue('status', 'DRAFT', { shouldDirty: true })
            void handleSubmit(onSubmit, onError)(e)
          }}
          disabled={!isDirty}
        >
          一時保存する
        </Button>
        <Button
          onClick={(e) => {
            setValue('status', 'PUBLISHED', { shouldDirty: true })
            void handleSubmit(onSubmit, onError)(e)
          }}
          disabled={!isDirty}
        >
          更新する
        </Button>
      </HStack>
    </header>
  )
}
