import { Header } from '@/components/layouts/Header'
import { LayoutContainer } from '@/components/layouts/LayoutContainer'
import { SubHeader } from '@/components/layouts/SubHeader'
import { Metadata } from 'next'

const title = 'FAQ'

export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <LayoutContainer>
        <SubHeader title={title} href="/">
          {children}
        </SubHeader>
      </LayoutContainer>
    </>
  )
}
