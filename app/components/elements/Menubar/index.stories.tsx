import { type Meta, type StoryObj } from '@storybook/react'
import { FC } from 'react'
import { Button } from '@/components/buttons/Button'
import { Menu, MenuItem, MenuList, MenuSeparator, MenuTrigger } from '../Menu'
import { Menubar } from './index'

const meta: Meta<typeof Menubar> = {
  title: 'element/Menubar',
  component: Menubar,
}

export default meta

type Story = StoryObj<typeof Menubar>

const Render: FC = () => {
  return (
    <Menubar>
      <Menu>
        <MenuTrigger>
          <Button>File</Button>
        </MenuTrigger>
        <MenuList>
          <MenuItem onClick={() => null}>New Tab</MenuItem>
          <MenuItem onClick={() => null}>New Window</MenuItem>
          <MenuItem onClick={() => null}>New Incognito Window</MenuItem>
          <MenuSeparator />
          <MenuItem onClick={() => null}>Print…</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuTrigger>
          <Button>Edit</Button>
        </MenuTrigger>
        <MenuList>
          <MenuItem onClick={() => null}>Undo</MenuItem>
          <MenuItem onClick={() => null}>Redo</MenuItem>
          <MenuSeparator />
          <MenuItem onClick={() => null}>Cut</MenuItem>
          <MenuItem onClick={() => null}>Copy</MenuItem>
          <MenuItem onClick={() => null}>Paste</MenuItem>
        </MenuList>
      </Menu>
    </Menubar>
  )
}

export const Default: Story = {
  args: {},
  render: () => <Render />,
}
