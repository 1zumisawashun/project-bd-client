import { Metadata } from 'next'
import { PropsWithChildren } from 'react'

const title = 'Article Create'

export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}

export default function Layout({ children }: PropsWithChildren) {
  return children
}
