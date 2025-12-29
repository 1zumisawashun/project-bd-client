import type { Meta, StoryObj } from '@storybook/react'

import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { userEvent, within } from '@storybook/test'
import { FC } from 'react'
import { Button } from '../../buttons/Button'
import { SimpleDialog } from './index'

const meta: Meta<typeof SimpleDialog> = {
  title: 'element/SimpleDialog',
  component: SimpleDialog,
}

export default meta

type Story = StoryObj<typeof SimpleDialog>

const Render: FC = () => {
  const { isOpen, close, open } = useDisclosure()
  return (
    <>
      <Button onClick={open}>Open SimpleDialog</Button>
      <SimpleDialog
        isOpen={isOpen}
        close={close}
        title="サインインに失敗しました"
        description="メールアドレスまたはパスワードが間違っています"
      />
    </>
  )
}

export const Default: Story = {
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
  },
}
