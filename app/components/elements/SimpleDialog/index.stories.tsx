import type { Meta, StoryObj } from '@storybook/react'

import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { SimpleDialog } from './index'
import { Button } from '../../buttons/Button'

const meta: Meta<typeof SimpleDialog> = {
  title: 'element/SimpleDialog',
  component: SimpleDialog,
}
export default meta
type Story = StoryObj<typeof SimpleDialog>

const Render: React.FC = () => {
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
  args: {},
  render: () => <Render />,
}
