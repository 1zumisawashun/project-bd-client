import type { Meta, StoryObj } from '@storybook/react'

import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './index'
import { Button } from '../../buttons/Button'

const meta: Meta<typeof Dialog> = {
  title: 'element/Dialog',
  component: Dialog,
}
export default meta
type Story = StoryObj<typeof Dialog>

function Render() {
  const { isOpen, close, open } = useDisclosure()
  return (
    <>
      <Button onClick={open}>Open Dialog</Button>
      <Dialog open={isOpen} onOpenChange={() => close()}>
        <DialogContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DialogTitle>削除しますか？</DialogTitle>
            <DialogDescription>本当に削除しますか？</DialogDescription>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
              <Button theme="danger" variant="outlined" onClick={close}>
                キャンセル
              </Button>
              <Button theme="danger" onClick={() => alert('delete!')}>
                削除する
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export const Default: Story = {
  args: {},
  render: Render,
}
