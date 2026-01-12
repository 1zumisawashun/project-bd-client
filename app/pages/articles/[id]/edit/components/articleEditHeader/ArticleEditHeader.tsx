'use client'

import { Button } from '@/components/buttons/Button'
import { IconAnchorButton } from '@/components/buttons/IconAnchorButton'
import { useToast } from '@/components/elements/Toast'
import { HStack } from '@/components/layouts/HStack'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import {
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form'
import { Article } from '../../../../shared/article.types'
import { Schema } from '../../../../shared/articleForm/articleForm.schema'
import { editArticle } from './articleEditHeader.action'
import styles from './articleEditHeader.module.css'

const BLOCK_NAME = 'articleEditHeader'

type ArticleEditHeaderProps = {
  article: Article
}

export const ArticleEditHeader: FC<ArticleEditHeaderProps> = ({ article }) => {
  const router = useRouter()
  const toast = useToast()
  const {
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useFormContext<Schema>()

  const onSubmit: SubmitHandler<Schema> = (data) => {
    startTransition(async () => {
      const response = await editArticle({ data, id: article.id })

      if (!response?.isSuccess) {
        toast.add({
          title: 'エラーが発生しました',
          description: response?.error?.message ?? 'エラーが発生しました',
        })
        return
      }
      toast.add({
        title: '成功しました',
        description: response.message ?? '成功しました',
      })

      router.push(`/articles/${response.data?.id ?? ''}`)
      router.refresh()
    })
  }

  const onError: SubmitErrorHandler<Schema> = (error) => {
    toast.add({
      title: 'エラーが発生しました',
      description: JSON.stringify(error, null, 2),
    })
  }

  return (
    <header className={styles[`${BLOCK_NAME}`]}>
      <IconAnchorButton href={`/articles/${article.id}`} variant="ghost">
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
