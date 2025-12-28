import { ToastProvider } from '@/components/elements/Toast'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  )
}
