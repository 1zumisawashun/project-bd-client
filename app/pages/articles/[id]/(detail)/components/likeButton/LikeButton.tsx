'use client'

import { HeartFilledIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import { IconButton } from '@/components/buttons/IconButton'
import { useToast } from '@/components/elements/Toast'
import { dislikeArticle } from './likeButton.action'
import styles from './likeButton.module.css'

const BLOCK_NAME = 'likeButton'

type LikeButtonProps = {
  articleId: string
  userId: string
}

export const LikeButton: FC<LikeButtonProps> = ({ articleId, userId }) => {
  const router = useRouter()
  const toast = useToast()

  const handleDislike = () => {
    startTransition(async () => {
      const response = await dislikeArticle({ articleId, userId })

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
    <IconButton shape="circle" variant="outlined" onClick={handleDislike}>
      <HeartFilledIcon className={styles[`${BLOCK_NAME}-icon`]} />
    </IconButton>
  )
}
