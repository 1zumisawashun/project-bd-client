import { FC } from 'react'
import { ToastProvider } from '@/components/elements/Toast'
import { SessionProvider } from '@/functions/libs/next-auth/SessionProvider'

export const ProviderDecorator = (Story: FC) => (
  <SessionProvider>
    <ToastProvider>
      <Story />
    </ToastProvider>
  </SessionProvider>
)

export const FullWidthDecorator = (Story: FC) => (
  <div style={{ width: '100vw' }}>
    <Story />
  </div>
)

export const SpWidthDecorator = (Story: FC) => (
  <div style={{ width: '576px' }}>
    <Story />
  </div>
)
