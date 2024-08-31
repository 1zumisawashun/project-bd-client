import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'

import { SiteWrapper } from './index'

const meta: Meta<typeof SiteWrapper> = {
  title: 'layout/SiteWrapper',
  component: SiteWrapper,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}

export default meta

type Story = StoryObj<typeof SiteWrapper>

const Render: React.FC = () => {
  return <SiteWrapper>SiteWrapper</SiteWrapper>
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}
