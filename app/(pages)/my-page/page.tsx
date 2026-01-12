import { getUserByEmailForMypage } from '@/functions/db/user'
import { auth } from '@/functions/libs/next-auth/auth'
import { MyPage } from '@/pages/my-page/MyPage'

export default async function Page() {
  const session = await auth()
  if (!session?.user.email) return null

  const user = await getUserByEmailForMypage({ email: session.user.email })
  if (!user) return null

  return <MyPage user={user} />
}
