import { type Meta, type StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/test'
import { FC } from 'react'
import { Button } from '@project-bd-client/ui'
import { useDisclosure } from '@project-bd-client/ui'
import { PublishDialog } from './PublishDialog'

const meta: Meta<typeof PublishDialog> = {
  title: 'feature/articles/PublishDialog',
  component: PublishDialog,
}

export default meta

type Story = StoryObj<typeof PublishDialog>

const Render: FC = () => {
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
