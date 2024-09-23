import AppProviders from '@/providers'

export const FullWidthDecorator = (Story: any) => (
  <AppProviders>
    <div style={{ width: '100vw' }}>
      <Story />
    </div>
  </AppProviders>
)

export const SpWidthDecorator = (Story: any) => (
  <AppProviders>
    <div style={{ width: '576px' }}>
      <Story />
    </div>
  </AppProviders>
)
