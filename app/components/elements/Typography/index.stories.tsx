import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '../../layouts/VStack'
import { Description, Title } from './index'

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
