// import { SiteWrapper } from '@/components/layouts/SiteWrapper'
import { Metadata } from 'next'
// import { TopPage } from '@/features/top-page/TopPage'
import { redirect } from 'next/navigation'

const title = 'Top Page'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Page() {
  redirect("/articles")
  // return (
  //   <SiteWrapper>
  //     <TopPage />
  //   </SiteWrapper>
  // )
}
