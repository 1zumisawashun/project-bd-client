import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { VStack } from '../../layouts/VStack'
import { Status } from './index'

const meta: Meta<typeof Status> = {
  title: 'element/Status',
  component: Status,
}

export default meta

type Story = StoryObj<typeof Status>

const Render: FC = () => {
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
