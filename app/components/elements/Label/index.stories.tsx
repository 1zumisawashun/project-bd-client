import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import type { Meta, StoryObj } from '@storybook/react'
import { FC } from 'react'
import { Label } from './index'

const meta: Meta<typeof Label> = {
  title: 'element/Label',
  component: Label,
}

export default meta

type Story = StoryObj<typeof Label>

const Render: FC = () => {
  return (
    <VStack>
      <HStack>
        <Label theme="primary">primary</Label>
        <Label theme="danger">danger</Label>
        <Label theme="success">success</Label>
      </HStack>

      <HStack>
        <Label theme="primary" onClick={() => null}>
          primary
        </Label>
        <Label theme="danger" onClick={() => null}>
          danger
        </Label>
        <Label theme="success" onClick={() => null}>
          success
        </Label>
      </HStack>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
