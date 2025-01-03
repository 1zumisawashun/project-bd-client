import { Metadata } from 'next'
import { redirect } from 'next/navigation'

const title = 'Top Page'
export const metadata: Metadata = {
  title: `Project BD | ${title}`,
}
export default function Page() {
  redirect('/articles')
}
