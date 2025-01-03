import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { userEvent, within } from '@storybook/test'
import { PublishDialog } from './PublishDialog'

const meta: Meta<typeof PublishDialog> = {
  title: 'feature/articles/PublishDialog',
  component: PublishDialog,
}
export default meta
type Story = StoryObj<typeof PublishDialog>

const Render: React.FC = () => {
  const { isOpen, close, open } = useDisclosure()
  return (
    <>
      <Button onClick={open}>Open Dialog</Button>
      <PublishDialog isOpen={isOpen} onClose={close} articleId="" />
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
