import { SiteWrapper } from '@/components/layouts/SiteWrapper'
import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

const title = 'Article Detail'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Layout({ children }: PropsWithChildren) {
  return <SiteWrapper>{children}</SiteWrapper>
}
