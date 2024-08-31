import type { Meta, StoryObj } from '@storybook/react'

import { MyPageSetting } from './MyPageSetting'

const meta: Meta<typeof MyPageSetting> = {
  title: 'feature/my-page/MyPageSetting',
  component: MyPageSetting,
}
export default meta
type Story = StoryObj<typeof MyPageSetting>
export const Default: Story = {}
