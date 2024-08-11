import type { Meta, StoryObj } from '@storybook/react'

import { SubHeader } from './index'

const meta: Meta<typeof SubHeader> = {
  title: 'layout/SubHeader',
  component: SubHeader,
}

export default meta

type Story = StoryObj<typeof SubHeader>

function Render() {
  return <SubHeader>children</SubHeader>
}

export const Default: Story = {
  args: {},
  render: Render,
}
