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
import { editArticle } from '../../ArticleEdit/articleEdit.action'

type Props = {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  onClose: ReturnType<typeof useDisclosure>['close']
  articleId: string
}
export const PublishDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  articleId,
}) => {
  const openToast = useToastDispatch()
  const router = useRouter()

  const handlePublish = () => {
    const data = {} as any

    startTransition(async () => {
      const response = await editArticle({
        data,
        id: articleId,
        status: 'PUBLISHED',
      })

      if (!response?.isSuccess) {
        openToast({
          theme: 'danger',
          title: 'エラー',
          description: response?.error?.message ?? 'エラーが発生しました',
        })
        return
      }
      openToast({
        theme: 'success',
        title: '成功',
        description: '削除に成功しました',
      })

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