import type { Meta, StoryObj } from '@storybook/react'

import { Status } from './index'
import { VStack } from '../../layouts/VStack'

const meta: Meta<typeof Status> = {
  title: 'element/Status',
  component: Status,
}
export default meta

type Story = StoryObj<typeof Status>

const Render: React.FC = () => {
  return (
    <VStack>
      <Status title="タイトルタイトルタイトル" status="empty">
        ディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプション
      </Status>
      <Status title="タイトルタイトルタイトル" status="error">
        ディスクリプションディスクリプションディスクリプションディスクリプションディスクリプションディスクリプション
      </Status>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <Render />,
}
