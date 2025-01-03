import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '@/components/layouts/VStack'
import { LabelAnchorButton } from './index'

const meta: Meta<typeof LabelAnchorButton> = {
  title: 'button/LabelAnchorButton',
  component: LabelAnchorButton,
}
export default meta
type Story = StoryObj<typeof LabelAnchorButton>

const Render: React.FC = () => {
  return (
    <VStack>
      <LabelAnchorButton theme="primary" href="#">
        primary
      </LabelAnchorButton>
      <LabelAnchorButton theme="danger" href="#">
        danger
      </LabelAnchorButton>
    </VStack>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}
