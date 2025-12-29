'use client'

import { Button } from '@/components/buttons/Button'
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { FC } from 'react'

type SimpleDialogProps = {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  close: ReturnType<typeof useDisclosure>['close']
  title: string
  description?: string
}

export const SimpleDialog: FC<SimpleDialogProps> = ({
  isOpen,
  close,
  title,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <VStack align="center">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <HStack>
          <Button onClick={close}>閉じる</Button>
        </HStack>
      </VStack>
    </Dialog>
  )
}
