'use client'

import { IconButton } from '@/components/buttons/IconButton'
import { HeartFilledIcon } from '@radix-ui/react-icons'
import { startTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useToastDispatch } from '@/components/elements/Toast'
import styles from '../articleDetail.module.scss'
import { dislikeArticle } from '../articleDetail.action'

const BLOCK_NAME = 'article-detail'
type Props = {
  articleId: string
  userId: string
}
export const LikeButton: React.FC<Props> = ({ articleId, userId }) => {
  const router = useRouter()
  const openToast = useToastDispatch()

  const handleDislike = async () => {
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
      <HeartFilledIcon className={styles[`${BLOCK_NAME}-like-icon`]} />
    </IconButton>
  )
}
