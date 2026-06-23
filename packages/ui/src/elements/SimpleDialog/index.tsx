'use client'

import { FC } from 'react'
import { Button } from '@ui/buttons/Button'
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from '@ui/elements/Dialog'
import { HStack } from '@ui/layouts/HStack'
import { VStack } from '@ui/layouts/VStack'
import { useDisclosure } from '@ui/hooks/useDisclosure'

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
