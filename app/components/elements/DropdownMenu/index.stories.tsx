import type { Meta, StoryObj } from '@storybook/react'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { userEvent, within } from '@storybook/test'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './index'

const meta: Meta<typeof DropdownMenu> = {
  title: 'element/DropdownMenu',
  component: DropdownMenu,
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

const Render: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon aria-label="hamburger-menu" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>New Tab</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>New Private Window</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByLabelText('hamburger-menu'))
  },
}
