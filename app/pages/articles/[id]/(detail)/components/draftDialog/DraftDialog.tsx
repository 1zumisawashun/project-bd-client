'use client'

import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import { Button } from '@/components/buttons/Button'
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'
import { useToast } from '@/components/elements/Toast'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { draftArticle } from './draftDialog.action'

type DraftDialogProps = {
  isOpen: boolean
  onClose: () => void
  articleId: string
}

export const DraftDialog: FC<DraftDialogProps> = ({
  isOpen,
  onClose,
  articleId,
}) => {
  const toast = useToast()
  const router = useRouter()

  const handleDraft = () => {
    startTransition(async () => {
      const response = await draftArticle({ id: articleId })

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
        <DialogTitle>記事を下書きに戻します</DialogTitle>
        <DialogDescription>
          記事が一覧から取り除かれます。マイページの下書きから閲覧可能です。
        </DialogDescription>
        <HStack>
          <Button variant="outlined" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleDraft}>下書きに戻す</Button>
        </HStack>
      </VStack>
    </Dialog>
  )
}
