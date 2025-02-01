import { Metadata } from 'next'

const title = 'Article Create'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Layout({ children }: React.PropsWithChildren) {
  return children
}
