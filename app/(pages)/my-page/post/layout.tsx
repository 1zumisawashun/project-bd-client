import { SiteWrapper } from '@/components/layouts/SiteWrapper'
import { SubHeader } from '@/components/layouts/SubHeader'
import { Metadata } from 'next'

const title = 'My Page Post'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SiteWrapper>
      <SubHeader title={title} href="/">
        {children}
      </SubHeader>
    </SiteWrapper>
  )
}
