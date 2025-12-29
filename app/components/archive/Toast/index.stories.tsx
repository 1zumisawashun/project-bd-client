import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/buttons/Button'
import { VStack } from '@/components/layouts/VStack'
import { FC } from 'react'
import { Toast } from './components/Toast'
import { ToastProvider, useToastDispatch } from './index'

const meta: Meta<typeof Toast> = {
  title: 'archive/Toast',
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

const ToastStatusListRender: FC = () => {
  return (
    <VStack>
      <Toast
        value={{
          id: '1',
          theme: 'primary',
          title: 'タイトルタイトルタイトル',
          description: 'ディスクリプションディスクリプション',
          isOpen: true,
        }}
        onClose={() => null}
      />
      <Toast
        value={{
          id: '2',
          theme: 'danger',
          title: 'タイトルタイトルタイトル',
          description: 'ディスクリプションディスクリプション',
          isOpen: true,
        }}
        onClose={() => null}
      />
      <Toast
        value={{
          id: '3',
          theme: 'success',
          title: 'タイトルタイトルタイトル',
          description: 'ディスクリプションディスクリプション',
          isOpen: true,
        }}
        onClose={() => null}
      />
    </VStack>
  )
}

const ToastDispatchRender: FC = () => {
  const openToast = useToastDispatch()
  return (
    <Button
      onClick={() =>
        openToast({
          theme: 'success',
          title: 'タイトルタイトルタイトル',
          description: 'ディスクリプションディスクリプション',
        })
      }
    >
      Click me
    </Button>
  )
}

export const ToastStatusList: Story = {
  args: {},
  render: () => <ToastStatusListRender />,
}

export const ToastDispatch: Story = {
  args: {},
  render: () => <ToastDispatchRender />,
}
