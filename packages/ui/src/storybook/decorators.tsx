import { FC } from 'react'

export const FullWidthDecorator = (Story: FC) => (
  <div style={{ width: '100vw' }}>
    <Story />
  </div>
)
