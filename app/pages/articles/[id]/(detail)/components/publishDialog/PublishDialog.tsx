'use client'

import { Button } from '@/components/buttons/Button'
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'
import { useToast } from '@/components/elements/Toast'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import { publishArticle } from './publishDialog.action'

type PublishDialogProps = {
  isOpen: boolean
  onClose: () => void
  articleId: string
}

export const PublishDialog: FC<PublishDialogProps> = ({
  isOpen,
  onClose,
  articleId,
}) => {
  const toast = useToast()
  const router = useRouter()

  const handlePublish = () => {
    startTransition(async () => {
      const response = await publishArticle({ id: articleId })

      if (!response?.isSuccess) {
        toast.add({
          title: 'エラーが発生しました',
          description: response.error.message ?? 'エラーが発生しました',
        })
        return
      }
      toast.add({
        title: '成功しました',
        description: response.message ?? '成功しました',
      })

      onClose()
      router.refresh()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <VStack align="center">
        <DialogTitle>記事を公開します</DialogTitle>
        <DialogDescription>
          記事を公開します。執筆お疲れ様でした！
        </DialogDescription>
        <HStack>
          <Button variant="outlined" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handlePublish}>公開する</Button>
        </HStack>
      </VStack>
    </Dialog>
  )
}
