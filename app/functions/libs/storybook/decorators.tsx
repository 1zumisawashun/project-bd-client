import { FC } from 'react'
import AppProviders from '@/providers'

export const FullWidthDecorator = (Story: FC) => (
  <AppProviders>
    <div style={{ width: '100vw' }}>
      <Story />
    </div>
  </AppProviders>
)

export const SpWidthDecorator = (Story: FC) => (
  <AppProviders>
    <div style={{ width: '576px' }}>
      <Story />
    </div>
  </AppProviders>
)
