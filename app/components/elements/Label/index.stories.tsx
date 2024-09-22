import type { Meta, StoryObj } from '@storybook/react'
import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { Label, LabelAction } from './index'

const meta: Meta<typeof Label> = {
  title: 'element/Label',
  component: Label,
}
export default meta
type Story = StoryObj<typeof Label>

const Render: React.FC = () => {
  return (
    <VStack>
      <HStack>
        <Label theme="primary">primary</Label>
        <Label theme="danger">danger</Label>
        <Label theme="success">success</Label>
      </HStack>

      <HStack>
        <Label theme="primary">
          primary
          <LabelAction onClick={() => null} />
        </Label>
        <Label theme="danger">
          danger
          <LabelAction onClick={() => null} theme="danger" />
        </Label>
        <Label theme="success">
          success
          <LabelAction onClick={() => null} theme="success" />
        </Label>
      </HStack>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
