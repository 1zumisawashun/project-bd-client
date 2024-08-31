import type { Meta, StoryObj } from '@storybook/react'

import { Tos } from './Tos'

const meta: Meta<typeof Tos> = {
  title: 'feature/tos/Tos',
  component: Tos,
}
export default meta
type Story = StoryObj<typeof Tos>

const Render: React.FC = () => {
  return <Tos />
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}
