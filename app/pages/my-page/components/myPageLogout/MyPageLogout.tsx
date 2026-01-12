'use client'

import { Button } from '@/components/buttons/Button'
import { Card, CardBody } from '@/components/elements/Card'
import {
  Dialog,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'
import { Description, Title } from '@/components/elements/Typography'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

type LogoutDialogProps = {
  isOpen: boolean
  close: () => void
}

export const LogoutDialog: FC<LogoutDialogProps> = ({ isOpen, close }) => {
  const router = useRouter()

  const logout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <VStack align="center">
        <DialogTitle>ログアウトしますか？</DialogTitle>
        <DialogDescription>本当にログアウトしますか？</DialogDescription>
        <HStack>
          <Button theme="danger" variant="outlined" onClick={close}>
            キャンセル
          </Button>
          <Button theme="danger" onClick={() => void logout()}>
            ログアウトする
          </Button>
        </HStack>
      </VStack>
    </Dialog>
  )
}

export const MyPageLogout: FC = () => {
  const { isOpen, open, close } = useDisclosure()

  return (
    <Card>
      <CardBody>
        <VStack gap={2}>
          <Title>ログアウトする</Title>
          <Description>
            アカウントからログアウトします。再度利用するにはログインが必要です。
          </Description>
        </VStack>
        <HStack>
          <Button onClick={open}>ログアウトする</Button>
        </HStack>
      </CardBody>
      <LogoutDialog isOpen={isOpen} close={close} />
    </Card>
  )
}
