import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'

import { LayoutContainer } from './index'

const meta: Meta<typeof LayoutContainer> = {
  title: 'layout/LayoutContainer',
  component: LayoutContainer,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof LayoutContainer>

const Render: React.FC = () => {
  return <LayoutContainer>SiteWrapper</LayoutContainer>
}

export const Default: Story = {
  render: () => <Render />,
}
