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
import { deleteArticle } from './deleteDialog.action'

type DeleteDialogProps = {
  isOpen: boolean
  onClose: () => void
  articleId: string
}

export const DeleteDialog: FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  articleId,
}) => {
  const toast = useToast()
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteArticle({ id: articleId })

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

      router.push(`/articles`)
      router.refresh()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <VStack align="center">
        <DialogTitle>記事を削除します</DialogTitle>
        <DialogDescription>一度削除すると復元ができません</DialogDescription>
        <HStack>
          <Button theme="danger" variant="outlined" onClick={onClose}>
            キャンセル
          </Button>
          <Button theme="danger" onClick={handleDelete}>
            削除する
          </Button>
        </HStack>
      </VStack>
    </Dialog>
  )
}
