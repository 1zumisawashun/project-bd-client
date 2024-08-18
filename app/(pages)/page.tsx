import { Header } from '@/components/layouts/Header'
import { LayoutContainer } from '@/components/layouts/LayoutContainer'
import { SubHeader } from '@/components/layouts/SubHeader'

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <LayoutContainer>
        <SubHeader>{children}</SubHeader>
      </LayoutContainer>
    </>
  )
}
