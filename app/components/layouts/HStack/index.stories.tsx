import { Button } from '@/components/buttons/Button'
import type { Meta, StoryObj } from '@storybook/react'

import { HStack } from './index'

const meta: Meta<typeof HStack> = {
  title: 'layout/HStack',
  component: HStack,
}
export default meta
type Story = StoryObj<typeof HStack>

const Render: React.FC = () => {
  return (
    <HStack>
      <Button>HStack Item 1</Button>
      <Button>HStack Item 2</Button>
    </HStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
