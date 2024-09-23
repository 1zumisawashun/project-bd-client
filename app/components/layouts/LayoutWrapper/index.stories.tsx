import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'

import { LayoutWrapper } from './index'

const meta: Meta<typeof LayoutWrapper> = {
  title: 'layout/LayoutWrapper',
  component: LayoutWrapper,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof LayoutWrapper>

const Render: React.FC = () => {
  return <LayoutWrapper>SiteWrapper</LayoutWrapper>
}

export const Default: Story = {
  render: () => <Render />,
}
