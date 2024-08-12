import type { Meta, StoryObj } from '@storybook/react'

import { Editor } from './index'

const meta: Meta<typeof Editor> = {
  title: 'element/Editor',
  component: Editor,
}
export default meta
type Story = StoryObj<typeof Editor>

function Render() {
  return <Editor />
}

export const Default: Story = {
  args: {},
  render: Render,
}
