'use client'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'
import { VStack } from '@/components/layouts/VStack'
import { HStack } from '@/components/layouts/HStack'
import { startTransition } from 'react'
import { useToastDispatch } from '@/components/elements/Toast'
import { useRouter } from 'next/navigation'
import { deleteArticle } from '../articleDetail.action'

type Props = {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  onClose: ReturnType<typeof useDisclosure>['close']
  articleId: string
}
export const DeleteDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  articleId,
}) => {
  const openToast = useToastDispatch()
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteArticle({ id: articleId })

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

      router.push(`/articles`)
      router.refresh()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  )
}
