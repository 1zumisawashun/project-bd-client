import type { Meta, StoryObj } from '@storybook/react'

import { useDisclosure } from '@/functions/hooks/useDisclosure'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { userEvent, within } from '@storybook/test'
import { FC } from 'react'
import { Menu, MenuContent, MenuItem, MenuTrigger } from './index'

const meta: Meta<typeof Menu> = {
  title: 'archive/Menu',
  component: Menu,
}

export default meta

type Story = StoryObj<typeof Menu>

const Render: FC = () => {
  const { isOpen, open, close } = useDisclosure()
  return (
    <Menu isOpen={isOpen} open={open} close={close}>
      <MenuTrigger>
        <HamburgerMenuIcon aria-label="hamburger-menu" />
      </MenuTrigger>

      <MenuContent>
        <MenuItem onClick={() => null}>New Tab</MenuItem>
        <MenuItem onClick={() => null}>New Window</MenuItem>
        <MenuItem onClick={() => null}>New Private Window</MenuItem>
      </MenuContent>
    </Menu>
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
