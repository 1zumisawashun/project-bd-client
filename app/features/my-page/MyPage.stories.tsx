import type { Meta, StoryObj } from '@storybook/react'

import { userEvent, within } from '@storybook/test'
import { mockUsers } from '@/functions/constants/users'
import { MyPage } from './MyPage'

const meta: Meta<typeof MyPage> = {
  title: 'feature/my-page/MyPage',
  component: MyPage,
}
export default meta
type Story = StoryObj<typeof MyPage>

const Render: React.FC = () => {
  return <MyPage user={mockUsers[0]!} />
}

export const MyPageSetting: Story = {
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /設定/ }))
  },
}
export const MyPagePublish: Story = {
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /公開中/ }))
  },
}
export const MyPageDraft: Story = {
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /下書き/ }))
  },
}
