import { NotFound } from '@/components/elements/NotFound'
import { getUserById } from '@/functions/db/user'
import { getSession } from '@/functions/libs/next-auth/session'
import { MyPage } from '@/pages/my-page/MyPage'

export default async function Page() {
  const session = await getSession()
  if (!session?.user.id) return <NotFound />

  const user = await getUserById({ id: session.user.id })
  if (!user) return <NotFound />

  return <MyPage user={user} />
}
