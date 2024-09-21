import { SiteWrapper } from '@/components/layouts/SiteWrapper'
import { Metadata } from 'next'

const title = 'Article Detail'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteWrapper>{children}</SiteWrapper>
}