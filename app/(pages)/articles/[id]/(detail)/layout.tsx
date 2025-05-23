import { SiteWrapper } from '@/components/layouts/SiteWrapper'
import { Metadata } from 'next'

const title = 'Article Detail'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Layout({ children }: React.PropsWithChildren) {
  return <SiteWrapper>{children}</SiteWrapper>
}
