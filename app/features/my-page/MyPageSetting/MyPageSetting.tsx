'use client'

import { VStack } from '@/components/elements/VStack'
import { MyPageLogout } from './components/MyPageLogout'
import { MyPageProfile } from './components/MyPageProfile'
import { MyPageEmail } from './components/MyPageEmail'
import { User } from '../myPage.type'

export const MyPageSetting: React.FC<{ user: User }> = ({ user }) => {
  return (
    <VStack gap={6}>
      <MyPageProfile user={user} />
      <MyPageEmail user={user} />
      <MyPageLogout />
    </VStack>
  )
}
