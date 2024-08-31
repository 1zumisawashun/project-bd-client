import { SiteWrapper } from '@/components/layouts/SiteWrapper'
import { Metadata } from 'next'
import { Index } from '@/features/index/index'

const title = 'Top Page'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Page() {
  return (
    <SiteWrapper>
      <Index />
    </SiteWrapper>
  )
}
