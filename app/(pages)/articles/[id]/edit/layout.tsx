import { Metadata } from 'next'

const title = 'Article Edit'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
