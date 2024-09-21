import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/buttons/Button'

import { VStack } from './index'

const meta: Meta<typeof VStack> = {
  title: 'element/VStack',
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
