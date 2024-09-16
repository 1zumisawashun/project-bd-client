'use client'

import { VStack } from '@/components/elements/VStack'
import { User } from '@/functions/types'
import { MyPageLogout } from './components/MyPageLogout'
import { MyPageProfile } from './components/MyPageProfile'
import { MyPageEmail } from './components/MyPageEmail'

type Props = {
  user: User
}
export const MyPageSetting: React.FC<Props> = ({ user }) => {
  return (
    <VStack gap={6}>
      <MyPageProfile user={user} />
      <MyPageEmail user={user} />
      <MyPageLogout />
    </VStack>
  )
}
