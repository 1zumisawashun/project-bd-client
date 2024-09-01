import type { Meta, StoryObj } from '@storybook/react'

import { MyPageSetting } from './MyPageSetting'
import { mockUser } from '../myPage.mock'

const meta: Meta<typeof MyPageSetting> = {
  title: 'feature/my-page/MyPageSetting',
  component: MyPageSetting,
}
export default meta
type Story = StoryObj<typeof MyPageSetting>

const Render: React.FC = () => {
  return <MyPageSetting user={mockUser} />
}
export const Default: Story = {
  render: () => <Render />,
}
