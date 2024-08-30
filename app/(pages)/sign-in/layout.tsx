import { LayoutContainer } from '@/components/layouts/LayoutContainer'
import { Metadata } from 'next'

const title = 'Sign In'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutContainer>{children}</LayoutContainer>
}
