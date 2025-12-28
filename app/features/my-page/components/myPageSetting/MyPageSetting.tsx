'use client'

import { VStack } from '@/components/layouts/VStack'
import { User } from '@/functions/types'
import { FC } from 'react'
import { MyPageEmail } from '../myPageEmail/MyPageEmail'
import { MyPageLogout } from '../myPageLogout/MyPageLogout'
import { MyPageProfile } from '../myPageProfile/MyPageProfile'

type Props = {
  user: User
}
export const MyPageSetting: FC<Props> = ({ user }) => {
  return (
    <VStack gap={6}>
      <MyPageProfile user={user} />
      <MyPageEmail user={user} />
      <MyPageLogout />
    </VStack>
  )
}
