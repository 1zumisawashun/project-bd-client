import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { SiteWrapper } from '@/components/layouts/SiteWrapper'

const title = 'Sign Up'

export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}

export default function Layout({ children }: PropsWithChildren) {
  return <SiteWrapper>{children}</SiteWrapper>
}
