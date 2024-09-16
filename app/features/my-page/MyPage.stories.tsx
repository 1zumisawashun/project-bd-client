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
  const user = mockUsers[0]
  return <MyPage user={user!} />
}

export const MyPageSetting: Story = {
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /setting/ }))
  },
}

export const MyPagePost: Story = {
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /post/ }))
  },
}
