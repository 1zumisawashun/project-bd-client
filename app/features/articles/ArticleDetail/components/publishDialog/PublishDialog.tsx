'use client'

import { Button } from '@/components/buttons/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'
import { useToastDispatch } from '@/components/elements/Toast'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import { publishArticle } from './publishDialog.action'

type Props = {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  onClose: ReturnType<typeof useDisclosure>['close']
  articleId: string
}
export const PublishDialog: FC<Props> = ({ isOpen, onClose, articleId }) => {
  const openToast = useToastDispatch()
  const router = useRouter()

  const handlePublish = () => {
    startTransition(async () => {
      const response = await publishArticle({ id: articleId })

      if (!response?.isSuccess) {
        openToast({
          theme: 'danger',
          title: 'エラーが発生しました',
          description: response.error.message ?? 'エラーが発生しました',
        })
        return
      }
      openToast({
        theme: 'success',
        title: '成功しました',
        description: response.message ?? '成功しました',
      })

      onClose()
      router.refresh()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  )
}
