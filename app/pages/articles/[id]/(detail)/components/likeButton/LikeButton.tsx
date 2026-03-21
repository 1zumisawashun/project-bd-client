'use client'

import { HeartFilledIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import { IconButton } from '@/components/buttons/IconButton'
import { useToast } from '@/components/elements/Toast'
import { dislikeArticle } from './likeButton.action'

type LikeButtonProps = {
  articleId: string
  userId: string
  className?: string
}

export const LikeButton: FC<LikeButtonProps> = ({
  articleId,
  userId,
  className,
}) => {
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
      <HeartFilledIcon className={clsx('ui-icon', className)} />
    </IconButton>
  )
}
