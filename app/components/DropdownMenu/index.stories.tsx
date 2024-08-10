/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import type { Meta, StoryObj } from '@storybook/react'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './index'

const meta: Meta<typeof DropdownMenu> = {
  title: 'DropdownMenu',
  component: DropdownMenu,
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

function Render() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon />
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
  render: Render,
}
