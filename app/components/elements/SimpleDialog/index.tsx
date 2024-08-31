'use client'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'
import { VStack } from '@/components/elements/VStack'
import { HStack } from '@/components/elements/HStack'

type Props = {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  close: ReturnType<typeof useDisclosure>['close']
  title: string
  description?: string
}
export const SimpleDialog: React.FC<Props> = ({
  isOpen,
  close,
  title,
  description,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <VStack align="center">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <HStack>
            <Button onClick={close}>閉じる</Button>
          </HStack>
        </VStack>
      </DialogContent>
    </Dialog>
  )
}
