'use client'

import { IconButton } from '@/components/buttons/IconButton'
import { useToastDispatch } from '@/components/elements/Toast'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { dislikeArticle } from './likeButton.action'
import styles from './likeButton.module.scss'

const BLOCK_NAME = 'likeButton'
type Props = {
  articleId: string
  userId: string
}
export const LikeButton: React.FC<Props> = ({ articleId, userId }) => {
  const router = useRouter()
  const openToast = useToastDispatch()

  const handleDislike = () => {
    startTransition(async () => {
      const response = await dislikeArticle({ articleId, userId })

      if (!response?.isSuccess) {
        openToast({
          theme: 'danger',
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
