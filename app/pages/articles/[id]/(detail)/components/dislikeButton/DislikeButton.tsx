'use client'

import { IconButton } from '@/components/buttons/IconButton'
import { useToast } from '@/components/elements/Toast'
import { HeartIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import { likeArticle } from './dislikeButton.action'
import styles from './dislikeButton.module.css'

const BLOCK_NAME = 'dislikeButton'
type Props = {
  articleId: string
  userId: string
}
export const DislikeButton: FC<Props> = ({ articleId, userId }) => {
  const router = useRouter()
  const toast = useToast()

  const handleLike = () => {
    startTransition(async () => {
      const response = await likeArticle({ articleId, userId })

      if (!response?.isSuccess) {
        toast.add({
          title: 'エラーが発生しました',
          description: response.error.message ?? 'エラーが発生しました',
        })
        return
      }
      router.refresh()
    })
  }

  return (
    <IconButton shape="circle" variant="outlined" onClick={handleLike}>
      <HeartIcon className={styles[`${BLOCK_NAME}-icon`]} />
    </IconButton>
  )
}
