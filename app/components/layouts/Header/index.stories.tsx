import type { Meta, StoryObj } from '@storybook/react'
import { FullWidthDecorator } from '@/functions/libs/storybook/decorators'

import { Header } from './index'

const meta: Meta<typeof Header> = {
  title: 'layout/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  decorators: [FullWidthDecorator],
}
export default meta
type Story = StoryObj<typeof Header>

const Render: React.FC = () => {
  return <Header />
}

export const Default: Story = {
  render: () => <Render />,
}
