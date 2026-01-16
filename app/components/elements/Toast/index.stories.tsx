import { type Meta, type StoryObj } from '@storybook/react'

import { Button } from '@/components/buttons/Button'
import { FC } from 'react'
import { Toast } from './components/Toast'
import { ToastProvider, useToast } from './index'

const meta: Meta<typeof Toast> = {
  title: 'element/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Toast>

const Render: FC = () => {
  const toast = useToast()
  const onClick = () => {
    toast.add({
      title: 'タイトルタイトルタイトル',
      description: 'ディスクリプションディスクリプション',
    })
  }
  return <Button onClick={onClick}>Click me</Button>
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}
