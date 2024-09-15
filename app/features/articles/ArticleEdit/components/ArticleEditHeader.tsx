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
import styles from '../articleEdit.module.scss'
import { Schema } from '../articleEdit.schema'
import { editArticle } from '../articleEdit.action'

const BLOCK_NAME = 'article-edit'
type Props = {
  articleId: string
}
export const ArticleEditHeader: React.FC<Props> = ({ articleId }) => {
  const router = useRouter()
  const { handleSubmit } = useFormContext<Schema>()

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    startTransition(async () => {
      const response = await editArticle(data, articleId)

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
      <Button onClick={handleSubmit(onSubmit, onError)}>更新する</Button>
    </header>
  )
}
