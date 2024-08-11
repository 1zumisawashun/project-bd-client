import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './index'

const meta: Meta<typeof Header> = {
  title: 'layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Header>

function Render() {
  return <Header />
}

export const Default: Story = {
  args: {},
  render: Render,
}
