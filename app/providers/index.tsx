import { ToastProvider } from '@/components/elements/Toast'
import { SessionProvider } from 'next-auth/react'

export default function AppProviders({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  )
}
