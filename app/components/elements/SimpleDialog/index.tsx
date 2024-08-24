'use client'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <Button onClick={close}>閉じる</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
