import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'
import { ToastProvider } from '@/components/elements/Toast'

export default function AppProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  )
}
