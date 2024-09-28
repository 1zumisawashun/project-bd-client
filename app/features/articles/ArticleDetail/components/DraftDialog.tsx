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
import { draftArticle } from '../articleDetail.action'

type Props = {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  onClose: ReturnType<typeof useDisclosure>['close']
  articleId: string
}
export const DraftDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  articleId,
}) => {
  const openToast = useToastDispatch()
  const router = useRouter()

  const handleDraft = () => {
    startTransition(async () => {
      const response = await draftArticle({ id: articleId })

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
      </DialogContent>
    </Dialog>
  )
}
