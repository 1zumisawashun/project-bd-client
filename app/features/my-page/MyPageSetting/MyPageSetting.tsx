'use client'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { LogoutDialog } from './components/LogoutDialog'

export const MyPageSetting: React.FC = () => {
  const dialog = useDisclosure()

  return (
    <div>
      <p>MyPageSetting</p>
      <Button onClick={dialog.open}>ログアウト</Button>
      <LogoutDialog isOpen={dialog.isOpen} close={dialog.close} />
    </div>
  )
}
