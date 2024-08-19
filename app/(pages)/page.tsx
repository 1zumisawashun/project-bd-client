import { SubHeader } from '@/components/layouts/SubHeader'
import { SiteWrapper } from '@/components/layouts/SiteWrapper'
import { Metadata } from 'next'

const title = 'Top Page'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <SiteWrapper>
      <SubHeader title={title}>{children}</SubHeader>
    </SiteWrapper>
  )
}
