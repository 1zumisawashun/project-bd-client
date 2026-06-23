import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { SiteWrapper } from '@project-bd-client/ui'
import { getSession } from '@/functions/libs/next-auth/session'

const title = 'Article Detail'

export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getSession()
  return <SiteWrapper session={session}>{children}</SiteWrapper>
}
