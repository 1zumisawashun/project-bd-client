import { type Meta, type StoryObj } from '@storybook/react'

import { Button } from '@/components/buttons/Button'
import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { userEvent, within } from '@storybook/test'
import { FC } from 'react'
import { DraftDialog } from './DraftDialog'

const meta: Meta<typeof DraftDialog> = {
  title: 'feature/articles/DraftDialog',
  component: DraftDialog,
}

export default meta

type Story = StoryObj<typeof DraftDialog>

const Render: FC = () => {
  const { isOpen, close, open } = useDisclosure()
  return (
    <>
      <Button onClick={open}>Open Dialog</Button>
      <DraftDialog isOpen={isOpen} onClose={close} articleId="" />
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
