import type { Meta, StoryObj } from '@storybook/react'

import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { Dialog, DialogContent } from './index'
import { Button } from '../Button'

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
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
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <h1>Title</h1>
            <p>description</p>
            <div>
              <Button onClick={close}>Close Dialog</Button>
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
