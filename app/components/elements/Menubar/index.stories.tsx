import type { Meta, StoryObj } from '@storybook/react'

import {
  Menubar,
  MenubarMenu,
  MenubarItem,
  MenubarContent,
  MenubarSeparator,
  MenubarTrigger,
} from './index'

const meta: Meta<typeof Menubar> = {
  title: 'element/Menubar',
  component: Menubar,
}

export default meta

type Story = StoryObj<typeof Menubar>

function Render() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>

        <MenubarContent align="start" sideOffset={5} alignOffset={-3}>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print…</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent align="start" sideOffset={5} alignOffset={-3}>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export const Default: Story = {
  args: {},
  render: Render,
}