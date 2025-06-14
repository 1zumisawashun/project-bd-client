import { Button } from '@/components/buttons/Button'
import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from './index'

const meta: Meta<typeof VStack> = {
  title: 'layout/VStack',
  component: VStack,
}
export default meta
type Story = StoryObj<typeof VStack>

const Render: React.FC = () => {
  return (
    <VStack>
      <Button>VStack Item 1</Button>
      <Button>VStack Item 2</Button>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
