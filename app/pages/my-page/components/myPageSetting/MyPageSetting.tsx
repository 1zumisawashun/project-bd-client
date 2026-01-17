'use client'

import { FC } from 'react'
import { VStack } from '@/components/layouts/VStack'
import { MypageUser } from '../../myPage.types'
import { MyPageEmail } from '../myPageEmail/MyPageEmail'
import { MyPageLogout } from '../myPageLogout/MyPageLogout'
import { MyPageProfile } from '../myPageProfile/MyPageProfile'

type MyPageSettingProps = {
  user: MypageUser
}

export const MyPageSetting: FC<MyPageSettingProps> = ({ user }) => {
  return (
    <VStack gap={6}>
      <MyPageProfile name={user.name} />
      <MyPageEmail email={user.email} />
      <MyPageLogout />
    </VStack>
  )
}
