import type { Meta, StoryObj } from '@storybook/react'

import { HStack } from '@/components/layouts/HStack'
import { VStack } from '@/components/layouts/VStack'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { userEvent, within } from '@storybook/test'
import { Button } from '../../buttons/Button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './index'

const meta: Meta<typeof Dialog> = {
  title: 'element/Dialog',
  component: Dialog,
}
export default meta
type Story = StoryObj<typeof Dialog>

const Render: React.FC = () => {
  const { isOpen, close, open } = useDisclosure()
  return (
    <>
      <Button onClick={open}>Open Dialog</Button>
      <Dialog open={isOpen} onOpenChange={() => close()}>
        <DialogContent>
          <VStack justify="center" align="center">
            <DialogTitle>削除しますか？</DialogTitle>
            <DialogDescription>本当に削除しますか？</DialogDescription>
            <HStack>
              <Button theme="danger" variant="outlined" onClick={close}>
                キャンセル
              </Button>
              <Button theme="danger" onClick={() => alert('delete!')}>
                削除する
              </Button>
            </HStack>
          </VStack>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button'))
  },
}
