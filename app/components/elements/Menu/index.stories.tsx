import type { Meta, StoryObj } from '@storybook/react'

import { userEvent, within } from '@storybook/test'
import { FC } from 'react'
import { Button } from '../../buttons/Button'
import { Menu, MenuItem, MenuList, MenuTrigger } from './index'

const meta: Meta<typeof Menu> = {
  title: 'element/Menu',
  component: Menu,
}

export default meta

type Story = StoryObj<typeof Menu>

const Render: FC = () => {
  return (
    <Menu>
      {/* compositionではなく、as-childみたいな挙動になる */}
      <MenuTrigger render={<Button>Open Menu</Button>} />
      <MenuList>
        <MenuItem onClick={() => null}>New Tab</MenuItem>
        <MenuItem onClick={() => null}>New Window</MenuItem>
        <MenuItem onClick={() => null}>New Private Window</MenuItem>
      </MenuList>
    </Menu>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open Menu' }))
  },
}
