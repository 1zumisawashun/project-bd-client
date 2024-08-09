/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */

import type { Meta, StoryObj } from '@storybook/react'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './index'

const meta: Meta<typeof DropdownMenuRoot> = {
  title: 'DropdownMenu',
  component: DropdownMenuRoot,
}

export default meta

type Story = StoryObj<typeof DropdownMenuRoot>

function Render() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>New Tab</DropdownMenuItem>
        <DropdownMenuItem>New Window</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>New Private Window</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}

export const Default: Story = {
  args: {},
  render: Render,
}
