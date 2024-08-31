import { MyPage } from '@/features/my-page/MyPage'
import { auth } from '@/functions/libs/next-auth/auth'
import { getUserById } from '@/functions/db/user'

export default async function Page() {
  const session = await auth()
  if (!session?.user.id) return null

  const user = await getUserById(session.user.id)
  if(!user) return null

  return <MyPage user={user} />
}
