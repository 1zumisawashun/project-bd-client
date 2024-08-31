import { useDisclosure } from '@/functions/hooks/useDisclosure'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/elements/Dialog'
import { Button } from '@/components/buttons/Button'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { VStack } from '@/components/elements/VStack'
import { HStack } from '@/components/elements/HStack'

type Props = {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  close: ReturnType<typeof useDisclosure>['close']
}

export const LogoutDialog: React.FC<Props> = ({ isOpen, close }) => {
  const router = useRouter()

  const logout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <VStack align="center">
          <DialogTitle>ログアウトしますか？</DialogTitle>
          <DialogDescription>本当にログアウトしますか？</DialogDescription>
          <HStack>
            <Button theme="danger" variant="outlined" onClick={close}>
              キャンセル
            </Button>
            <Button theme="danger" onClick={logout}>
              ログアウトする
            </Button>
          </HStack>
        </VStack>
      </DialogContent>
    </Dialog>
  )
}
