import type { Meta, StoryObj } from '@storybook/react'

import { Title, Description } from './index'
import { VStack } from '../VStack'

const meta: Meta<typeof Title> = {
  title: 'element/Typography',
  component: Title,
}
export default meta

type Story = StoryObj<typeof Title>

const Render: React.FC = () => {
  return (
    <VStack>
      <Title>タイトル</Title>
      <Description>ディスクリプション</Description>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
