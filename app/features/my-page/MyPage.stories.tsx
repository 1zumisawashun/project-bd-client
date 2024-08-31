import type { Meta, StoryObj } from '@storybook/react'

import { MyPage } from './MyPage'
import { mockUser } from './myPage.mock'

const meta: Meta<typeof MyPage> = {
  title: 'feature/my-page/MyPage',
  component: MyPage,
}
export default meta
type Story = StoryObj<typeof MyPage>

const Render: React.FC = () => {
  return <MyPage user={mockUser} />
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}
