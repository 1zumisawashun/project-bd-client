import type { Meta, StoryObj } from '@storybook/react'

import { NotFound } from './index'
import { VStack } from '../../layouts/VStack'

const meta: Meta<typeof NotFound> = {
  title: 'element/NotFound',
  component: NotFound,
}
export default meta

type Story = StoryObj<typeof NotFound>

const Render: React.FC = () => {
  return (
    <VStack>
      <NotFound />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
