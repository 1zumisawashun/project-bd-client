import { SiteWrapper } from '@/components/layouts/SiteWrapper'
import { Metadata } from 'next'
import { TopPage } from '@/features/top-page/TopPage'

const title = 'Top Page'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Page() {
  return (
    <SiteWrapper>
      <TopPage />
    </SiteWrapper>
  )
}
