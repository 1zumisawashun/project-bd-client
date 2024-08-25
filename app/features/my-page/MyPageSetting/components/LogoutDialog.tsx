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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DialogTitle>ログアウトしますか？</DialogTitle>
          <DialogDescription>本当にログアウトしますか？</DialogDescription>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <Button theme="danger" variant="outlined" onClick={close}>
              キャンセル
            </Button>
            <Button theme="danger" onClick={logout}>
              ログアウトする
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
