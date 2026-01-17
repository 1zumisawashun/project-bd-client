import { type Meta, type StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'
import { FC } from 'react'
import { MyPage } from './MyPage'
import { MOCK_MYPAGE_USER } from './myPage.mocks'

const meta: Meta<typeof MyPage> = {
  title: 'feature/my-page/MyPage',
  component: MyPage,
}
export default meta
type Story = StoryObj<typeof MyPage>

const RenderDefault: FC = () => {
  return <MyPage user={MOCK_MYPAGE_USER} />
}
const RenderEmpty: FC = () => {
  return <MyPage user={MOCK_MYPAGE_USER} />
}

export const MyPageSetting: Story = {
  render: () => <RenderDefault />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /設定/ }))
  },
}
export const MyPagePublish: Story = {
  render: () => <RenderDefault />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /公開中/ }))
  },
}
export const MyPageDraft: Story = {
  render: () => <RenderDefault />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /下書き/ }))
  },
}
export const MyPageLike: Story = {
  render: () => <RenderDefault />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /いいね/ }))
  },
}
export const MyPagePublishEmpty: Story = {
  render: () => <RenderEmpty />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /公開中/ }))
  },
}
export const MyPageDraftEmpty: Story = {
  render: () => <RenderEmpty />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /下書き/ }))
  },
}
export const MyPageLikeEmpty: Story = {
  render: () => <RenderEmpty />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('tab', { name: /いいね/ }))
  },
}
