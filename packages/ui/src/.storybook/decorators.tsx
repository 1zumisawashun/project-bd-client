import { type FC } from 'react'

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
