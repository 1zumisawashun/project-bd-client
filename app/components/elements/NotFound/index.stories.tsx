import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '../../layouts/VStack'
import { NotFound } from './index'

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
