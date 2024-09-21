import type { Meta, StoryObj } from '@storybook/react'
import { HStack } from '@/components/layouts/HStack'

import { Label } from './index'

const meta: Meta<typeof Label> = {
  title: 'element/Label',
  component: Label,
}
export default meta
type Story = StoryObj<typeof Label>

const Render: React.FC = () => {
  return (
    <HStack>
      <Label theme="primary">primary</Label>
      <Label theme="danger">danger</Label>
      <Label theme="success">success</Label>
    </HStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
