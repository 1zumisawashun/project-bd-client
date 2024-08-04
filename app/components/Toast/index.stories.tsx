import type { Meta, StoryObj } from '@storybook/react'

import { Toast } from './index'
import { useToast } from './hooks/useToast'
import { Button } from '../Button'

const meta: Meta<typeof Toast> = {
  title: 'Toast',
  component: Toast,
}

export default meta

type Story = StoryObj<typeof Toast>

function Render() {
  const { isOpen, setIsOpen, handleClick } = useToast()
  return (
    <>
      <Button onClick={handleClick}>Click me</Button>
      <Toast isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

export const Default: Story = {
  args: {},
  render: Render,
}
