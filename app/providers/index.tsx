import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/elements/Toast'

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  )
}
